/* 
* GameOn specific functions
*/
var fs = require('fs')
  , request = require('request')
  , strftime = require('strftime');

//set URIs based on the site
switch (process.env.site) {
	case '1' : exports.episodes = 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=1';
		exports.school = 'https://builder.eachscape.com/data/collections/19285.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
		exports.articleSearch = 'http://www.buckscountycouriertimes.com/search-whiz/?f=rss&t=article&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.buckscountycouriertimes.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.videoSearch = 'http://s491706590.onlinehome.us/Sportsstats/feed.php?site=1&';
		exports.defaultLogo = '/images/GameOn_BigLogo.png';
		exports.edition = 'CTI';
		exports.title = 'Bucks County Courier Times';
		exports.subscribeLink = 'http://m.buckscountycouriertimes.com/subscribe/offers/26_26_subscription_offer_sale.html?gameonapp';
		exports.registrationLink = 'https://calkins.newzware.com/ss70v2/cti/custom/ssmpop.js'
		break;
	case '2': exports.episodes = 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=2';
		exports.school = 'https://builder.eachscape.com/data/collections/19271.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19273.xml';
		exports.articleSearch = 'http://www.burlingtoncountytimes.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.burlingtoncountytimes.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.videoSearch = 'http://s491706590.onlinehome.us/Sportsstats/feed.php?site=2&';
		exports.defaultLogo = '/images/GameOn_BigLogo.png';
		exports.edition = 'BTI';
		exports.title = 'Burlington County Times';
		exports.subscribeLink = 'http://m.burlingtoncountyimes.com/subscribe/offers/26_26_subscription_offer_sale.html?gameonapp';
		exports.registrationLink = 'https://calkins.newzware.com/ss70v2/bti/custom/ssmpop.js'
		break;
	case '3': exports.episodes = 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=3';
		exports.school = 'https://builder.eachscape.com/data/collections/19285.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
		exports.articleSearch = 'http://www.buckscountycouriertimes.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.buckscountycouriertimes.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.videoSearch = 'http://s491706590.onlinehome.us/Sportsstats/feed.php?site=3&';
		exports.defaultLogo = '/images/GameOn_BigLogo.png';
		exports.edition = 'CMI';
		exports.title = 'Intelligencier';
		exports.subscribeLink = 'http://m.theintell.com/subscribe/offers/26_26_subscription_offer_sale.html?gameonapp';
		exports.registrationLink = 'https://calkins.newzware.com/ss70v2/cmi/custom/ssmpop.js'
		break;
	case '4': exports.episodes = 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=4';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.timesonline.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.videoSearch = 'http://s491706590.onlinehome.us/Sportsstats/feed.php?site=4&';
		exports.defaultLogo = '/images/GameOn_BigLogo.png';
		exports.edition = 'BNI';
		exports.title = 'Beaver County Times';
		exports.subscribeLink = 'http://m.timesonline.com/mobile_adv/subscribepromo/';
		exports.registrationLink = 'https://calkins.newzware.com/ss70v2/bni/custom/ssmpop.js'
		break;
	default: exports.episodes = 'http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=1';
		exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		exports.sport = 'https://builder.eachscape.com/data/collections/19268.xml';
		exports.articleSearch = 'http://www.buckscountycouriertimes.com/search-whiz/?f=rss&t=article&l=100&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.imageSearch = 'http://www.buckscountycouriertimes.com/search-whiz/?f=rss&t=image&l=30&d=&d1=&d2=&s=start_time&sd=desc&c[]=';
		exports.videoSearch = 'http://s491706590.onlinehome.us/Sportsstats/feed.php?site=1&';
		exports.defaultLogo = '/images/GameOn_BigLogo.png';
		exports.edition = 'CTI';
		exports.title = 'Bucks County Courier Times';
		exports.subscribeLink = 'http://m.buckscountycouriertimes.com/subscribe/offers/26_26_subscription_offer_sale.html?gameonapp';
		exports.registrationLink = 'https://calkins.newzware.com/ss70v2/cti/custom/ssmpop.js'
} 

//build episode html files
episode_update = function(){
	fs.mkdir('public/html', function (err) {}) //create the directory if it is missing. 
	request({url: exports.episodes, json: true}, function(error, res, body) {
		if (!error) {
			console.log("Result Status for file " + exports.episodes + ' = ' + res.statusCode);
			var itemNumber = 1, pageNumber = 1, itemOnPage = 1, results = body.media_list.length, output = '', nextPage = 0, done = itemNumber <= results;
			while (results && !done) { //loop through the results if we have any until we are done
				var currentVideo = body.media_list[itemNumber]; //get the meta data for the video at position itemNumber
				output += "<div id='video-item'><div class='img-container'><a href=/videopage?mediaid=" + currentVideo.media_id + "><img src=" + currentVideo.thumbnails[1].url + "></a></div><p class='vidtitle'><a href=videopage?mediaid=" + currentVideo.media_id + ">" + currentVideo.title + "<br><span class='episodeDate'>" + strftime('%B %e, %Y', new Date(currentVideo.publish_date * 1000)) + "</span></a></p><div class='clear'></div></div>";
				(++itemNumber >= results) ? done = true : done = false; //increment itemNumber and if we are >- results we are done looping.
				if (itemOnPage++ >= 5 || done) { //time to write out the page
					if (!done) { //we need to write out the next link as long as we aren't done. 
						nextPage = pageNumber + 1;
						output += "<a class='next' href='/html/episode-" + nextPage + ".html'>Next page</a>";
					}
					fs.writeFileSync('public/html/episode-' + pageNumber++ + '.html',output);
					output = ''; itemOnPage = 1;
				}
			}
		}
	});
}

//load the episodes files and begin a timer for cache purposes.
// episode_update();
episode_update();
setInterval(function() {console.log("Updating episode file."); episode_update()},300000) //time in milliseconds