$(document).ready(function(){
	if ($(document).width() <= 480){	
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:290px;height:163px' );
	}	
	else if ($(document).width() >= 481){
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );
	}
});

$(window).resize(function(){
	if ($(document).width() <= 480){	
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:290px;height:163px' );
	}	
	else if ($(document).width() >= 481){
$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );
	}
});