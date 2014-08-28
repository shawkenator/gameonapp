/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , fs = require('fs')
  , request = require('request')
  , http = require('http')
  , strftime = require('strftime')
  , morgan = require('morgan')
  , gameon = require('./gameon'); 

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('title','GameOn');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

//load the episodes files and begin a timer for cache purposes.
gameon.episode_update()
setInterval(function() {console.log("Updating episode file."); gameon.episode_update()},300000) //time in milliseconds

app.get('/', function (req, res, next)  {
	var options = {url: 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=1',json: true};
	request(options, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var episode = body.media_list[0];
			var episode_date = (strftime('%B %e, %Y', new Date(episode.publish_date * 1000))); //multiple by 1000 to convert to milliseconds
			res.render('index',  { title : 'Home', 
								   media : episode.media_id,
								   date : episode_date });
		}
		else {console.log('there was an error')
			//what to do if there was an error?
			next('route');
		}
	});
});

app.get('/episodes', function (req, res, next) {
	fs.exists('public/html/episode-1.html', function(exists){
		if (exists) {
			res.render('episodes',  { 	title : 'Past Episodes',
										date: strftime('%B %e, %Y') }); 
		} else {
			console.log("episode file missing");
			// Do something
			next('route');
		}
	});

});

app.get('/schools', function (req, res, next) {
	res.render('schools',  { 	title : 'Schools',
								date: strftime('%B %e, %Y') })
});

app.get('/search', function (req, res, next) {
	res.render('search',  { title : 'Search',
							date: strftime('%B %e, %Y') })
});

app.get('/sports', function (req, res, next) {
	res.render('sports',  { title : 'Sports',
							date: strftime('%B %e, %Y') })
});

app.get('/videopage', function (req, res, next) {
	if (!req.query.mediaid) { //if the mediaid query parameter is missing, do not process
		next('route'); 
	}
	res.render('videopage',  { 	title : 'Video Player Page',
								date: strftime('%B %e, %Y'),
								media: req.query.mediaid })
});

app.get('/*', function (req, res, next) {
	res.render('notfound',  { 	title : 'File Not Found',
								date: strftime('%B %e, %Y')})
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});