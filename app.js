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
  , gameon = require('./gameon')
  , xmldoc = require('xmldoc');

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

var site = process.env.site;
console.log('For site = ' + site);

app.get('/', function (req, res, next)  {
	var options = {url: 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=' + site,json: true};
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
	var listVal = [];
	request(gameon.school,function(error, response, body){
		if (!error && response.statusCode == 200) {
			var records = (new xmldoc.XmlDocument(body)).children[0].children;
			records.forEach(function(item){
				listVal.push({thumb: item.children[2].attr.medium,
						displayname: item.children[0].val,
						link: '/article_list?title='+ item.children[0].val +'&searchParm=' + item.children[1].val + '*'});
			});
		}
		console.log(listVal[0].link)
		res.render('selectlist',  { 'title' : 'Schools',
									'date': strftime('%B %e, %Y'),
									'list': listVal});
	});
});

app.get('/sports', function (req, res, next) {
	var listVal = [];
	request(gameon.sport,function(error, response, body){
		if (!error && response.statusCode == 200) {
			var records = (new xmldoc.XmlDocument(body)).children[0].children;
			records.forEach(function(item){
				listVal.push({thumb: item.children[0].attr.medium,
									displayname: item.children[1].val,
									link: '/article_list?title='+item.children[1].val+'&searchParm=' + item.children[2].val + '*'});
			});
		}
		res.render('selectlist',  { 'title' : 'Sports',
									'date': strftime('%B %e, %Y'),
									'list': listVal});
	});
});

app.get('/article_list', function (req,res,next) {
		if (!req.query.searchParm) { //There is no searchParm provided
			next('route'); 
		}
		var listVal = [];
		console.log('Search param: ' + req.query.searchParm);
		request(gameon.articleSearch + req.query.searchParm, function (error, response, body){
			if (!error && response.statusCode == 200) {
				var records = (new xmldoc.XmlDocument(body)).children[0].children;
				records.forEach(function (items) {
					var headline = '', guid = '', link = '';
					if (items.name === 'item') {
						items.children.forEach(function (item){
							if (item.name === 'title') {headline = item.val;}
							if (item.name === 'guid') {guid = item.val;}
							if (item.name === 'multimedia') {
								item.children.forEach(function (multimedia) {
										multimedia.children.forEach(function (media) {
											if (media.name === 'link') {
												console.log('link: ' + media.val); 
												if (link === '') {link = media.val }
											}
										})
								})
							}
						})
					}
					if (link == '') {link = gameon.defaultLogo } //There was no image attached
					if (guid !== '') {listVal.push({'headline': headline, 'guid': guid, 'link': link});}
				})
			}
			console.log(listVal)
			res.render('article_list', { 'title' : req.query.title || '',
									 'date': strftime('%B %e, %Y'),
									  'list': listVal });
		})
});

app.get('/search', function (req, res, next) {
	res.render('search',  { title : 'Search',
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