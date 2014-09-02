/* 
* GameOn specific functions
*/
var fs = require('fs')
  , request = require('request');

switch (process.env.site) {
	case '1' : var episodes = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		module.exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		module.exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
		break;
	case '2': var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		module.exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		module.exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
		break;
	case '3': var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		module.exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		module.exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
		break;
	case '4': var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		module.exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		module.exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
		break;
	default: var episode = 'http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html';
		module.exports.school = 'https://builder.eachscape.com/data/collections/19266.xml';
		module.exports.sport = 'https://builder.eachscape.com/data/collections/19294.xml';
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