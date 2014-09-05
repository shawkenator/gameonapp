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
  , parseXML = require('xml2js').parseString;

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
			parseXML(body, function (err, result) {
    			records = result.response.data[0].record;
    			records.forEach(function(record){
    				listVal.push({'thumb': record.school_image[0].$.medium,
						'displayname': record.displayname[0],
						'link': '/article_list?title='+ record.displayname[0] +'&searchParm=' + record.queryparameter[0] + '*'});
    			});
			});
		}
		res.render('selectlist',  { 'title' : 'Schools',
									'date': strftime('%B %e, %Y'),
									'list': listVal});
	})
});

app.get('/sports', function (req, res, next) {
	var listVal = [];
	request(gameon.sport,function(error, response, body){
		if (!error && response.statusCode == 200) {
			parseXML(body, function (err, result) {
    			records = result.response.data[0].record;
    			records.forEach(function(record){
    				listVal.push({'thumb': record.sport_image[0].$.medium,
						'displayname': record.displayname[0],
						'link': '/article_list?title='+ record.displayname[0] +'&searchParm=' + record.queryparameter[0] + '*'});
    			});
			});
		}
		res.render('selectlist',  { 'title' : 'Sports',
									'date': strftime('%B %e, %Y'),
									'list': listVal});
	});
});

app.get('/article_list', function (req,res,next) {
	if (!req.query.searchParm) {next('route');} //There is no searchParm provided
	var title = req.query.title || '';
	var listVal = [];
	request(gameon.articleSearch + req.query.searchParm, function (error, response, body){
			if (!error && response.statusCode == 200) {
				parseXML(body, function (err, result) {	
					records = result.rss.channel[0].item;
					records.forEach(function (record) {
						var headline = '', guid = '', imageURI = '';
						headline = record.title[0];
						guid = '/article?title=' + title + '&guid=uuid:' + record.guid[0]._.substr(12); //build link to the article page
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link;
						} else { imageURI = gameon.defaultLogo } //There was no image attached use default
						listVal.push({'headline': headline, 'guid': guid, 'image': imageURI});
					})
				})
			}
	res.render('article_list', { 'title' : title,
								 'date': strftime('%B %e, %Y'),
								 'list': listVal });
	})
})

app.get('/image_list', function (req,res,next) {
	if (!req.query.searchParm) {next('route');} //There is no searchParm provided
	var title = req.query.title || '';
	var listVal = [];
	request(gameon.imageSearch + req.query.searchParm, function (error, response, body){
			if (!error && response.statusCode == 200) {
				parseXML(body, function (err, result) {	
					records = result.rss.channel[0].item;
					records.forEach(function (record) {
						var headline = '', guid = '', imageURI = '', imageThumb = '';
						headline = record.title[0];
						guid = '/article?title=' + title + '&guid=uuid:' + record.guid[0]._.substr(12); //build link to the article page
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link;
							imageThumb = record.multimedia[0].media[0].thumbnail;
						} else { imageURI = gameon.defaultLogo } //There was no image attached use default
						listVal.push({'headline': headline, 'guid': guid, 'image': imageURI, 'thumb': imageThumb});
					})
				})
			}
	res.render('image_list', { 'title' : title,
								 'date': strftime('%B %e, %Y'),
								 'list': listVal });
	})
})

app.get('/article', function (req, res, next) {
	if (!req.query.guid) {next('route')} //there was no guid passed.
	var title = req.query.title || '';
	var headline = '', author = '', content = '', pubDate = '', imageURI = '';
	request(gameon.articleSearch + req.query.guid, function (error, response, body){
		if (!error && response.statusCode == 200) {
			parseXML(body, function (err, result) {	
				records = result.rss.channel[0].item;
				records.forEach(function (record) {
						headline = record.title[0];
						author = record.author[0];
						content = record.content[0];
						pubDate = strftime('%a, %d %b %Y %H:%M %Z', new Date(record.pubDate[0]));
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link; }
					});
				});
			}
		res.render('article', { 'title' : title,
								'date': pubDate,
								'image': imageURI,
								'headline': headline,
								'author': author,
								'content': content });
	});
});

app.get('/image', function (req, res, next) {
	if (!req.query.guid) {next('route')} //there was no guid passed.
	var title = req.query.title || '';
	var headline = '', author = '', content = '', pubDate = '', imageURI = '';
	request(gameon.imageSearch + req.query.guid, function (error, response, body){
		if (!error && response.statusCode == 200) {
			parseXML(body, function (err, result) {	
				records = result.rss.channel[0].item;
				records.forEach(function (record) {
						headline = record.title[0];
						author = record.author[0];
						content = record.content[0];
						pubDate = strftime('%a, %d %b %Y %H:%M %Z', new Date(record.pubDate[0]));
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link; }
					});
				});
			}
		res.render('image', { 'title' : title,
								'date': pubDate,
								'image': imageURI,
								'headline': headline,
								'author': author,
								'content': content });
	});
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