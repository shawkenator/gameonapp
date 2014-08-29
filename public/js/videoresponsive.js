$(document).ready(function(){
if(navigator.platform === 'iPad') {
            window.onorientationchange = function() {

            var orientation = window.orientation;

            // Look at the value of window.orientation:

            if (orientation === 0) {
            	$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:280px;height:163px' );

            } else if (orientation === 90) {
            	$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );

            } else if (orientation === -90) {
             	$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:620px;height:349px' );

            } else if (orientation === 180) {
            	$('.LimelightEmbeddedPlayer .LimeLightEmbeddedPlayerFlash').attr( 'style', 'width:280px;height:163px' );

            }
          }       
        }
 });

/*


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


*/