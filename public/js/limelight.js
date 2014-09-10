function limelightPlayerCallback (playerId, eventName, data) {
	if (eventName == 'onPlayerLoad' && (LimelightPlayer.getPlayers() == null || LimelightPlayer.getPlayers().length == 0)) {
		LimelightPlayer.registerPlayer("limelight_player_clip");}
    switch (eventName) {
      	case 'onPlayerLoad': 
			if (playerId == 'limelight_player_1') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fintel%2Fvideos-and-photos%2Fgame-on-preroll%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_2') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fburlington%2Fvideos-and-photos%2Fgame-on-preroll%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_3') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fcourier%2Fvideos-and-photos%2Fgame-on-preroll%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_4') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fbeaver%2Fvideos%2Fgame_on%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_clip_1') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fcourier%2Fvideos-and-photos%2Fgame-on-clips-preroll%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_clip_2') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fburlington%2Fvideos-and-photos%2Fgame-on-clips-preroll%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_clip_3') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fcourier%2Fvideos-and-photos%2Fgame-on-clips-preroll%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
			else if (playerId == 'limelight_player_clip_4') {
				document.getElementById(playerId).doSetAd('preroll', 'Vast','url=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F9098%2Fbeaver%2Fvideos%2Fgame_on%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26correlator%3D%5Btimestamp%5D');
			}
	} 
}