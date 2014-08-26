/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , fs = require('fs')
  , request = require('request')
  , http = require('http')
  , strftime = require('strftime');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('title','GameOn');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res, next){
	app.locals.current_date = strftime('%B %e, %Y');
	fs.exists('public/html/episode-1.html', function(exists){
		console.log(exists ? "Yes" : "No");
	});
	fs.stat('public/html/episode-1.html',function(err,stats){
		if (err) throw err;
		console.log(stats.mtime);
	});

	var options = {url: 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html',
					headers: {'If-Modified-Since':'Mon 25 Aug 2014 16:06:45 GMT'}}
	request(options, function(error, res, body) {
		if (!error) { console.log(body)}
		next('route');
	});
});

app.get('/', function (req, res)  {
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
		}
	});
});

app.get('/episodes', function (req, res) {
	res.render('episodes',  { 	title : 'Past Episodes',
								date: app.locals.current_date }); 
});

app.get('/episodesh5', function (req, res) {
	res.render('episodesh5',  { title : 'HTML 5 Video Past Episodes',
								date: app.locals.current_date }); 
});

app.get('/schools', function (req, res) {
	res.render('schools',  { 	title : 'Schools',
								date: app.locals.current_date })
});

app.get('/search', function (req, res) {
	res.render('search',  { title : 'Search',
							date: app.locals.current_date })
});

app.get('/sports', function (req, res) {
	res.render('sports',  { title : 'Sports',
							date: app.locals.current_date })
});

app.get('/videopage', function (req, res) {
	res.render('videopage',  { 	title : 'Video Player Page',
								date: app.locals.current_date })
});

app.get('/videopageh5', function (req, res) {
	res.render('videopageh5',  { 	title : 'HTML 5 Video Player Page',
									date: app.locals.current_date })
});

app.get('/moreepisodes', function (req, res) {
	res.render('moreepisodes',  { 	title : 'Past Episodes',
									date: app.locals.current_date})
});

app.get('/*', function (req, res) {
	res.render('notfound',  { 	title : 'File Not Found',
								date: app.locals.current_date })
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});