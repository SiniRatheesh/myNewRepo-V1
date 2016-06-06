var totArts = 0;
var initialLoadSize = 100;
var startTime = new Date()
    .getTime();
var endTime;
var todayDate = new Date();
var stHours = todayDate.getHours();
var stMinutes = todayDate.getMinutes();
var stSeconds = todayDate.getSeconds();

function shareOnFacebook(){
    var url = "http://www.facebook.com/sharer/sharer.php?u=www.comikka.com";
    windowOpenIntent(url);
}

function shareOnTwitter(){
    var url = "http://twitter.com/intent/tweet?text=Check Out Comikka Comics on Mobile!&hashtags=Comikka,mobileComics&url=http://www.comikka.com";
    windowOpenIntent(url);
}

function shareOnFacebookArt(){
   // var descriptionCOmics = $('#comicDescription').html(descriptionforComic).text();
       	  FB.ui({
    		  method: 'share',
    		  title:screenName,
    		  href: 'http://www.comikka.com/artist/' +userId,
    		  picture: imageUrl,
    	        caption: 'comikka',
    	      //  description: descriptionCOmics
              description: descriptionforComic
    		}, function(response){console.log(response);});
}

function shareOnTwitterArt(){
    var url = "http://twitter.com/intent/tweet?text=CheckOut&hashtags=Comikka,mobileComics&url=http://www.comikka.com/artist/"+userId;
    windowOpenIntent(url);
}

function loadArtsByArtist(){
    totArts = 0;
    $.getJSON(REST_SERVER + 'artist/' + currentuserid + '/artsize', function(data) {
        totArts = data.count;
        $.getJSON(REST_SERVER + 'artist/' + currentuserid + '/arts/parts/' + 0, function(data)  {
            //-------------------------------------------Code for facebook share---------------------------------------------
            $.each(data.userID, function(idx, vl)  {
                userId = vl.userid;
                if (vl.screenName != undefined) {
                    screenName = vl.screenName;
                }
            });
            if (data.response[1].artfile != null){
                var tempURL = data.response[1].artfile.s3ThumbUrl;
                imageUrl = tempURL.replace(/ /g, '%20');
            } else {
                imageUrl = "http://www.comikka.com/img/artist.jpg";
            }
            artistIdforDesc = data.response[0].artfile.artistId;
            currentArtistArts = data.response;
            loadArtPanelIndex();
            $.getJSON(REST_SERVER + 'getDescriptionbyID/' + artistIdforDesc, function(descriptionData){
                if (descriptionData.description !== undefined){
                    descriptionforComic = descriptionData.description;
                } else if (descriptionData.description[0].artistDescription !== undefined) {
                    descriptionforComic = descriptionData.description[0].artistDescription.description;
                } else{
                    descriptionforComic = 'No Description';
                }
            });
            //-------------------------------------------------------------------------------------------------
            loadInitialImage();
            preloadNextImage();
            if (totArts > initialLoadSize){
                setTimeout(function(){
                    $.getJSON(REST_SERVER + 'artist/' + currentuserid + '/arts/parts/' + 1, function(data){
                        $.merge(currentArtistArts, data.response);
                        secondLoaded = true;
                        loadArtPanelIndex();
                        $("#comic-total-page-num-txt").val("/ " +artPanelsOnly.length);
                    });
                }, 3000);
            }else  {
                secondLoaded = true;
            }
        });
    });
}



function loadComicsOfComic(){
    	loadAuthor(CURRENT_ARTIST_ID,ART_COUNT,CURRENT_ARTIST);
}
