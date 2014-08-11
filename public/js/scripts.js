var media_id = "stuff"
$(document).ready(function(){
    $('#address').text(media_id);

});

// The Google Geocoding API url used to get the JSON data
// $.getJSON('js/results.json', function (json) {
//	$.each(json.media_list, function(i,item){
//    	//Only grab "entries" 5 times
//        if(i < 5){
//        	//into the body of the page
//            $("#items").append('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
//            // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
//        }
//	});
// });

function myFunc( data ){
  console.log('data: '+ data.total_results ); // Logs "jQuery Howto"
  console.log(data.media_list[0].title);

 $.each(data.media_list, function(i,item){
    	//Only grab "entries" 5 times
        if(i < 5){
        	//into the body of the page
            $("#items").prepend('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
            // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
        }

        if(i>=5 && i<=10){
          //into the body of the page
            $("#items-more").append('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
            // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
        }

        if(i>=10 && i<=15){
          //into the body of the page
            $("#items-more2").append('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
            // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
        }
	});
}


$.ajax({
  type:     "GET",
  url:      "http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=1&f=jsonp",
  dataType: "jsonp",
});