$(document).ready(function(){
	if ($(document).width() <= 359){	
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:280px;height:163px' );
	}	
	else if ($(document).width() >= 360){
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );
	}
});

$(window).resize(function(){
	if ($(document).width() <= 359){	
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:280px;height:163px' );
	}	
	else if ($(document).width() >= 360){
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );
	}
});