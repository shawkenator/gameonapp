$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var morepageNumcurrent = $.urlParam('page')

var pageNum = $.urlParam('page')
var morenextpageNum = (++pageNum);

var pageNumnewvar = $.urlParam('page');
var moreNextpagetest = (++pageNumnewvar+1);

var threepageNumnewvar = $.urlParam('page');
var threwemoreNextpagetest = (++pageNumnewvar+2);

console.log('More Current page #:'+morepageNumcurrent);
console.log('More Next page #:'+morenextpageNum);
console.log('More Next page test #:'+moreNextpagetest);

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

var jsonpath = $.getJSON('http://s491706590.onlinehome.us/Sportsstats/GameOn.php?site=1', function (json) {
    var mediaidhp = json.media_list[0].media_id;
    console.log('MORE.js Title & mediaidhp =: ', mediaidhp);
 
    if (moreNextpagetest == 3){
      $.each(json.media_list, function(i,item){
        //Only grab "entries" 5 times
        if(i > 4 && i < 10){
          //into the body of the page
          $("#items2").append('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
          console.log('This is equation 1');
          // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
        }
      });
    }

    if (threwemoreNextpagetest == 4){
      $.each(json.media_list, function(i,item){
        //Only grab "entries" 5 times
        if(i > 9 && i < 15){
          //into the body of the page
          $("#items3").append('<div id="video-item"><div class="img-container"><img src="' + item.thumbnails[0].url + '"></div><p class="vidtitle">' + item.title + '<!--' + item.publish_date + '--></p><div id="playbutton"><div class="div btn"><a href="videopage?mediaid='+item.media_id+'">Play</a></div></div> <div class="clear"></div>');
          console.log('This is equation 2');
          // $("#title").append("<p>" + item.title + "</p><p>" + item.media_id + "</p><p>" + item.description + "</p><p>" + item.thumbnails[0].url + "</p>");
        }
      });
    }
    return json
    // $("#videocontain").append('<span class="LimelightEmbeddedPlayer"><script src="http://video.limelight.com/player/embed.js"></script><object type="application/x-shockwave-flash" id="limelight_player_clip" name="limelight_player_clip" class="LimelightEmbeddedPlayerFlash" width="330" height="186" data="http://video.limelight.com/player/loader.swf"><param name="movie" value="http://video.limelight.com/player/loader.swf"/><param name="wmode" value="window"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashVars" value="playerForm=Player&amp;mediaId='+mediaidhp+'&amp;channelId=bf1248a0d30443d5937d3632de55cbc4"/></object><script>LimelightPlayerUtil.initEmbed("limelight_player_clip");</script></span>');
});
