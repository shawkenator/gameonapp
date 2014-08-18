$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var pageNumcurrent = $.urlParam('page')

var pageNum = $.urlParam('page')
var nextpageNum = (++pageNum);

console.log('Current page #:'+pageNumcurrent);
console.log('Next page #:'+nextpageNum);

/* $.ajaxPrefilter(function(options) {
  if(options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
}); */

$.get(
    'http://s491706590.onlinehome.us/Sportsstats/cache/load_next.php?page=1',
    function(response) {
        $("#items").html(response);
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

/* function myFunc( data ){
  console.log('data: '+ data.total_results ); // Logs "jQuery Howto"
  console.log(data.media_list[0].title);

  if (pageNumcurrent == 1){
    $.each(data.media_list, function(i,item){
      //Only grab "entries" 5 times
      if(i < 5){
        //into the body of the page
        $("#items").prepend('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
        // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
      }
    });
  }

  if (pageNumcurrent == 2){
    $.each(data.media_list, function(i,item){
      //Only grab "entries" 5 times
      if(i > 4 && i < 10){
        //into the body of the page
        $("#items2").prepend('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
        // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
      }
    });
  }

  if (pageNumcurrent == 3){
    $.each(data.media_list, function(i,item){
      //Only grab "entries" 5 times
      if(i > 9 && i < 15){
        //into the body of the page
        $("#items3").prepend('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
        // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
      }
    });
  }

  if (pageNumcurrent == 4){
    $.each(data.media_list, function(i,item){
      //Only grab "entries" 5 times
      if(i > 14 && i < 20){
        //into the body of the page
        $("#items4").prepend('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
        // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
      }
    });
  }

}


$.ajax({
  type:     "GET",
  url:      "http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=1&f=jsonp",
  dataType: "jsonp",
}); */