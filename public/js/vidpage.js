$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var mediaidVar = 'playerForm=Player&amp;mediaId='+$.urlParam('mediaid')+'&amp;channelId=bf1248a0d30443d5937d3632de55cbc4'

console.log($.urlParam('page'));
console.log(mediaidVar);