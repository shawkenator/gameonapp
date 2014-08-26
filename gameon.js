/* 
* GameOn specific functions
*/
var fs = require('fs')
  , request = require('request');

exports.episode_update = function(){
	request('http://s491706590.onlinehome.us/Sportsstats/cache/episode-1.html', function(error, res, body) {
		if (!error) {
			console.log("Result Status " + res.statusCode);
			fs.writeFile('public/html/episode-1.html',body,function(err){
				if (!err) console.log('episode-1.html updated');
			})
		}
	});
}