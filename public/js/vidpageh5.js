$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var mediaidVar = $.urlParam('mediaid')

var mediaVarurl = 'http://s491706590.onlinehome.us/Sportsstats/video.php?mediaid='+mediaidVar
// var mediaVarurl = '/js/video.json'
// var mediaVarurl = 's491706590.onlinehome.us/Sportsstats/GameOn.php?site=1&f=jsonp'
 console.log('mediaVarurl: '+ mediaVarurl );


//The Google Geocoding API url used to get the JSON data
$.getJSON(mediaVarurl, function (json) {
	var videurl = json.encodings[0].master_playlist_url;
	$("#videocontain").append('<video width="330" height="186" controls><source src="'+videurl+'" type="application/x-mpegURL">Your browser does not support the video tag.</video>');
	console.log('Title : ', videurl);
});

/* $.ajax({
  type:     "GET",
  url:      "http://"+mediaVarurl,
  dataType: "jsonp",
});
*/

// console.log('steve'+$.urlParam('mediaid'));
// console.log('hawk'+mediaidVar);

//function myFunc( data ){
//  console.log('data: '+ data.total_results ); // Logs "jQuery Howto"
//  console.log(data.media_list[0].url);
//  console.log('steve'+data.media_id);
//}