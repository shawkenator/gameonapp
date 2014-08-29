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

// Checks to see if the platform is strictly equal to iPad:
if (navigator.platform === 'iPad') {
    window.onorientationchange = function() {

        var orientation = window.orientation;

        // Look at the value of window.orientation:
        // iPad is in Portrait mode.
        if (orientation === 0) {
        	$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:280px;height:163px' );    

        } else if (orientation === 90) {
            // iPad is in Landscape mode. The screen is turned to the left.
            $('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );

        } else if (orientation === -90) {
            // iPad is in Landscape mode. The screen is turned to the right.
            $('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );

        } else if (orientation === 180) {
            // Upside down portrait.
            $('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:280px;height:163px' );

        }
    }
}​