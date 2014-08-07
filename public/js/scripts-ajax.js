// The Google Geocoding API url used to get the JSON data
$.getJSON('js/results.json', function (json) {
	$.each(json.media_list, function(i,item){
    	//Only grab "entries" 5 times
        if(i < 5){
        	//into the body of the page
            $("#items").append('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
            // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
        }
	});
});




