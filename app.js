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
  , parseXML = require('xml2js').parseString
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , session = require('express-session')
  , bodyParse = require('body-parser')
  , flash = require('connect-flash')
  , cookieParser = require('cookie-parser')
  , newzware = require('./newzware');

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
app.use(stylus.middleware({ src: __dirname + '/public', compile: compile}));
app.use(bodyParse());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ secret: 'gameon' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({passReqToCallback : true}, 
	function (req, username, password, done) { newzware(done, req, username, password, gameon.edition, 504) } )
);

passport.serializeUser(function(user, done) {
 	done(null, user);
});
 
passport.deserializeUser(function(user, done) {
	done(null, user);
});

var site = process.env.site;
console.log('For site = ' + site);

app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
});

app.get('/', function (req, res, next)  {
	var options = {'url': gameon.episodes,json: true};
	request(options, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var episode = body.media_list[0];
			var episode_date = (strftime('%B %e, %Y', new Date(episode.publish_date * 1000))); //multiple by 1000 to convert to milliseconds
			res.render('index',  { 'title' : 'Home', 
								   'media' : episode.media_id,
								   'date' : strftime('%B %e, %Y'),
								   'playerID': 'limelight_player_' + process.env.site});
		}
		else {console.log(error)
			//what to do if there was an error?
			next('route');
		}
	});
});

app.get('/signin', function (req, res, next) {
	guid = req.query.guid || '';
	title = req.query.title || '';
	if (req.query.school) {var videoLink = '&school=' + req.query.school}
	else if (req.query.sport) {var videoLink = '&sport=' + req.query.sport}
	else { var videoLink = ''}
	console.log(req.query.searchParm);
	res.render('signin',{'title':title,
						'guid':guid,
						'searchParm':req.query.searchParm,
						'videoLink':videoLink,
						'message': res.locals.error_messages[0],
						'subLink': gameon.subscribeLink,
						'publication': gameon.title,
						'register': gameon.registrationLink });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/signin?title='+req.param('title')+'&guid='+req.param('guid')); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/article?title='+req.param('title')+'&guid='+req.param('guid'));
    });
  })(req, res, next);
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
	request(gameon.school,function (error, response, body){
		if (!error && response.statusCode == 200) {
			parseXML(body, function (err, result) {
    			records = result.response.data[0].record;
    			records.forEach(function(record){
    				listVal.push({'thumb': (record.school_image[0].$.medium) ? record.school_image[0].$.medium : '/images/GameOn_BigLogo.png' ,
						'displayname': record.displayname[0],
						'link': '/article_list?title='+ record.displayname[0] +'&searchParm=' + record.queryparameter[0] + '*&school=' + record.queryparameterv[0]});
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
    			records.forEach(function (record){
    				listVal.push({'thumb': (record.sport_image[0].$.medium) ? record.sport_image[0].$.medium : '/images/GameOn_BigLogo.png',
						'displayname': record.displayname[0],
						'link': '/article_list?title='+ record.displayname[0] +'&searchParm=' + record.queryparameter[0] + '*&sport='+ record.queryparameterv[0]});
    			});
			});
		}
		res.render('selectlist',  { 'title' : 'Sports',
									'date': strftime('%B %e, %Y'),
									'list': listVal});
	});
});

app.get('/video_list', function (req,res,next) {
	if (req.query.school) {var searchParm = '&school=' + req.query.school}
	else if (req.query.sport) {var searchParm = '&sport=' + req.query.sport}
	var title = req.query.title || '';
	var listVal = [];
	request({'url': gameon.videoSearch + searchParm, 'json':true}, function (error, response, body){
			if (!error && response.statusCode == 200) {
				if (body.total_results == 0) {res.render('no_records', {'title':title, message: 'No videos available',
														'imageLink': '/image_list/?title=' + title + '&searchParm=' + req.query.searchParm + searchParm,
														'articleLink': '/article_list/?title=' + title + '&searchParm=' + req.query.searchParm + searchParm}); return;};
				body.media_list.forEach(function (episode) {
					listVal.push({'thumb': episode.thumbnails[1].url,
									'mediaid': episode.media_id,
									'headline': episode.title});
				})
			}
		console.log(listVal);
		res.render('video_list', { 'title' : title,
									 'date': strftime('%B %e, %Y'),
									 'imageLink': '/image_list/?title=' + title + '&searchParm=' + req.query.searchParm + searchParm,
									 'articleLink': '/article_list/?title=' + title + '&searchParm=' + req.query.searchParm + searchParm,
									 'list': listVal });
	})
})

app.get('/article_list', function (req,res,next) {
	if (req.query.school) {var videoLink = '&school=' + req.query.school}
	else if (req.query.sport) {var videoLink = '&sport=' + req.query.sport}
	else {videoLink = ''}
	var title = req.query.title || '';
	var listVal = [];
	request(gameon.articleSearch + req.query.searchParm, function (error, response, body){
			if (!error && response.statusCode == 200) {
				parseXML(body, function (err, result) {	
					records = result.rss.channel[0].item;
					if (!records) {res.render('no_records', {'title':title, message: 'No articles available',
															'imageLink': '/image_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink,
															'videopageLink': '/video_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink}); return;};
					records.forEach(function (record) {
						var headline = '', guid = '', imageURI = '';
						headline = record.title[0];
						guid = '/article?title=' + title + '&guid=uuid:' + record.guid[0]._.substr(12) + '&searchParm=' + req.query.searchParm + videoLink; //build link to the article page
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link;
						} else { imageURI = gameon.defaultLogo } //There was no image attached use default
						listVal.push({'headline': headline, 'guid': guid, 'image': imageURI});
					})
				})
			}
		res.render('article_list', { 'title' : title,
									 'date': strftime('%B %e, %Y'),
									 'imageLink': '/image_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink,
									 'videopageLink': '/video_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink,
									 'list': listVal });
	})
})

app.get('/image_list', function (req,res,next) {
	if (req.query.school) {var videoLink = '&school=' + req.query.school}
	else if (req.query.sport) {var videoLink = '&sport=' + req.query.sport}
	else {var videoLink = ''}
	var title = req.query.title || '';
	var listVal = [];
	request(gameon.imageSearch + req.query.searchParm, function (error, response, body){
			if (!error && response.statusCode == 200) {
				parseXML(body, function (err, result) {
					records = result.rss.channel[0].item;
					if (!records) {res.render('no_records', {'title':title, message: 'No photos available',
															'videopageLink': '/video_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink,
															'articleLink': '/article_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink}); return; };
					records.forEach(function (record) {
						var headline = '', guid = '', imageURI = '', imageThumb = '', content = '', author = '';
						headline = record.title[0];
						author = record.author[0];
						content = record.content[0];
						pubDate = strftime('%a, %d %b %Y %H:%M %Z', new Date(record.pubDate[0]));
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link;
							imageThumb = record.multimedia[0].media[0].thumbnail;
						} else { imageURI = gameon.defaultLogo } //There was no image attached use default
						listVal.push({'headline': headline, 'image': imageURI, 'thumb': imageThumb, 'author': author, 'content': content, 'date': pubDate});
					})
				})
			}
	res.render('image_list', { 'title' : title,
								 'date': strftime('%B %e, %Y'),
								 'articleLink': '/article_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink,
								 'videopageLink': '/video_list/?title=' + title + '&searchParm=' + req.query.searchParm + videoLink,
								 'list': listVal });
	})
})

app.get('/article', function (req, res, next) {
	if (!req.query.guid) {next('route')} //there was no guid passed.
	var title = req.query.title || '';
	if (req.query.school) {var videoLink = '&school=' + req.query.school}
	else if (req.query.sport) {var videoLink = '&sport=' + req.query.sport}
	else { var videoLink = ''}
	var headline = '', author = '', content = '', pubDate = '', imageURI = '';
	request(gameon.articleSearch + req.query.guid, function (error, response, body){
		if (!error && response.statusCode == 200) {
			parseXML(body, function (err, result) {	
				record = result.rss.channel[0].item[0];
					// check to see if content requires a subscription
					console.log('Paid flag: ' + record.paid[0]);
					if (record.paid[0] == 1 && !req.isAuthenticated()) {
						res.redirect('/signin?title=' + title + '&guid=' + req.query.guid + '&searchParm=' + req.query.searchParm + videoLink);
						return;
					} else {
						headline = record.title[0];
						author = record.author[0];
						content = record.content[0];
						pubDate = strftime('%a, %d %b %Y %H:%M %Z', new Date(record.pubDate[0]));
						if (record.multimedia[0].media) { //images attached
							imageURI = record.multimedia[0].media[0].link; }
						res.render('article', { 'title' : title,
												'date': pubDate,
												'image': imageURI,
												'headline': headline,
												'author': author,
												'content': content });
					}
				});
			}
		res.end();
	});
});

app.get('/search', function (req, res, next) {
	res.render('search',  { title : 'Search',
							date: strftime('%B %e, %Y') })
});

app.get('/settings', function (req, res, next) {
	res.render('settings',  { 'title' : 'settings',
							'date': strftime('%B %e, %Y'),
							'site': site })
});

// video page from a clip video
app.get('/videopage/clip', function (req, res, next) {
	if (!req.query.mediaid) { //if the mediaid query parameter is missing, do not process
		next('route'); 
	}
	playerID = 'limelight_player_clip_' + process.env.site;
	res.render('videopage',  { 	'title' : 'Video Player Page',
								'date': strftime('%B %e, %Y'),
								'media': req.query.mediaid,
								'playerId': playerID  })
});

// video page from a GameOn video link
app.get('/videopage', function (req, res, next) {
	if (!req.query.mediaid) { //if the mediaid query parameter is missing, do not process
		next('route'); 
	}
	playerID = 'limelight_player_' + process.env.site;
	res.render('videopage',  { 	'title' : 'Video Player Page',
								'date': strftime('%B %e, %Y'),
								'media': req.query.mediaid,
								'playerId': playerID  })
});

app.get('/*', function (req, res, next) {
	res.render('notfound',  { 	title : 'File Not Found',
								date: strftime('%B %e, %Y')})
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});