/* 
* GameOn specific functions
*/
var fs = require('fs')
  , request = require('request');

//set URIs based on the site
switch (process.env.site) {
	case '1' : var episodes = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=article&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.defaultLogo = 'images/GameOn_BigLogo.png';
		break;
	case '2': var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.defaultLogo = 'images/GameOn_BigLogo.png';
		break;
	case '3': var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.defaultLogo = 'images/GameOn_BigLogo.png';
		break;
	case '4': var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.defaultLogo = 'images/GameOn_BigLogo.png';
		break;
	default: var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.defaultLogo = 'images/GameOn_BigLogo.png';
} 

episode_update = function(){
	request(episodes, function(error, res, body) {
		if (!error) {
			console.log("Result Status for file " + episodes + ' = ' + res.statusCode);
			fs.writeFile('public/html/episode-1.html',body,function(err){
				if (!err) console.log('File: ' + episodes + ' updated');
			})
		}
	});
}

//load the episodes files and begin a timer for cache purposes.
episode_update();
setInterval(function() {console.log("Updating episode file."); episode_update()},300000) //time in milliseconds