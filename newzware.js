/* 
* Newzware functions
*/

/* required modules */
var request = require('request'),
	parseXML = require('xml2js').parseString;

/* Newzware configurations */
var sURL = 'https://calkins.newzware.com/authentication/auth70_xml.jsp?site=cti';

module.exports = function (done, req, username, password, edition, appid) {
	var Ipaddress = req.ip;
	var requestURL = sURL + '&login_id=' + username + '&password=' + password + '&auth_ip=' + Ipaddress + '&edition=' + edition + '&appId=' + appid;
	request(requestURL, function (error, response, body) {
		if (error) return done(error);
		parseXML(body, function (err, result) {
			if (err) return done(err);
			console.log(result);
			var user = {};
			if (result.newzware['exit-code'][0] != '0') {
				return done(null, false, req.flash('error_messages', result.newzware.message[0]))
			}
			user.authenticated = result.newzware.authenticated[0];
			if (user.authenticated != 'Yes') {
				return done(null, false, req.flash('error_messages', 'No subscription found'))
			}
			user.username = result.newzware.login[0];
			user.id = result.newzware.accountnum[0]
			return done(null, user);
		})
	});
}