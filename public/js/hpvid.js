$.getJSON('js/results.json', function (json) {
    var mediaidhp = json.media_list[0].media_id;
    console.log('Title & mediaidhp =: ', mediaidhp);
    $("#videocontain").append('<span class="LimelightEmbeddedPlayer"><script src="http://video.limelight.com/player/embed.js"></script><object type="application/x-shockwave-flash" id="limelight_player_clip" name="limelight_player_clip" class="LimelightEmbeddedPlayerFlash" width="330" height="186" data="http://video.limelight.com/player/loader.swf"><param name="movie" value="http://video.limelight.com/player/loader.swf"/><param name="wmode" value="window"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashVars" value="playerForm=Player&amp;mediaId='+mediaidhp+'&amp;channelId=bf1248a0d30443d5937d3632de55cbc4"/></object><script>LimelightPlayerUtil.initEmbed("limelight_player_clip");</script></span>');
});
