if (!Date.now) {
  Date.now = function now() {
    return +(new Date);
  };
}
var flag = false;
var CUR_ITEM;
var PREV_ITEM;
var CUR_INDEX;
var CUR_UID;
var CURRENT_USER_INFO = {};
var isOpen = "false"; 
var millenUrl;
var ip ;
var mm_url;
var CURRENT_USER_ID = 11;
var canRunAds = true;
var canRunAdsfav = true;
var currentArtIndex = 0;
var str = "";
var anchrs =  $("#lftBxAnchor,#rgtBxAnchor");
var currentAdvId = null
var currentFileId = null;
var isAdvertisementR;
var currentuserid;
var currentimgid = null;
var selectedArtist;
var currentArtistArts;
var currentArtIndex = -1;
var secondLoaded = false;

$(window.document).bind("userInfoLoaded", function(){
    CURRENT_USER_ID = LOGGED_IN_USER.user.id;
});
        
$(window.document).bind("ComicLoaded", function(e,params){
	var w = params.w;
	var h = params.h;

	if((getUrlVars()["adnw"] != 'undefined' && getUrlVars()["adnw"] != 1) &&
		(getUrlVars()["padnw"] != 'undefined' && getUrlVars()["padnw"] != 1) && 
			(getUrlVars()["lbadnw"] != 'undefined' && getUrlVars()["lbadnw"] != 1) && 
				(getUrlVars()["mmnw"] != 'undefined' && getUrlVars()["mmnw"] != 1) && 
					(getUrlVars()["gadnw"] != 'undefined' && getUrlVars()["gadnw"] != 1) && 
						(getUrlVars()["apadnw"] != 'undefined' && getUrlVars()["apadnw"] != 1) &&
							(getUrlVars()["mpadnw"] != 'undefined' && getUrlVars()["mpadnw"] != 1) &&
								(getUrlVars()["adcdnw"] != 'undefined' && getUrlVars()["adcdnw"] != 1) &&
									(getUrlVars()["blockAdv"] != 'undefined' && getUrlVars()["blockAdv"] != 1)){
										$("#artImageView").css({'height':h+'px',  'width':w+'px'});
										$(".eventBox").css({'height':((h) / 2)+'px','width':((w) / 2)+'px'});
										$("#bl").css({'top':((h) / 2)+'px'});
										$("#br").css({'top':((h) / 2)+'px'});				
	}else{
		$("#artImageView").css({'height':'250px',  'width':'300px',	   'overflow': 'hidden' }); 
		$(".eventBox").css({'height':((250) / 2)+'px',	'width':((300) / 2)+'px'});
		$("#bl").css({'top':'0px', 'height':'0px',  'width':'0px', });
		$("#br").css({'top':'0px', 'height':'0px', 'width':'0px',});
		$("#tl").css({'top':(0)+'px'});
		$("#tr").css({'top':(0)+'px'});
	}
});
	
$(function () {
	(function(a){
			 (jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
		CURRENT_USER_INFO.browser = navigator.appCodeName;
 		CURRENT_USER_INFO.OSName = "Unknown OS";
 		if (navigator.appVersion.indexOf("Win")!=-1)    CURRENT_USER_INFO.OSName="Windows";
 		if (navigator.appVersion.indexOf("Mac")!=-1)    CURRENT_USER_INFO.OSName="MacOS";
 		if (navigator.appVersion.indexOf("X11")!=-1)    CURRENT_USER_INFO.OSName="UNIX";
 		if (navigator.appVersion.indexOf("Linux")!=-1)  CURRENT_USER_INFO.OSName="Linux";
 		
         $.getJSON('http://api.wipmania.com/jsonp?callback=?', function(data) {
 			CURRENT_USER_INFO.country = data.address.country;
 		});
		     
 		$.get('http://jsonip.com', function (res) {
 			CURRENT_USER_INFO.ip  = res.ip;
            var mm_adserver = "ads.mp.mydas.mobi";
            var mm_placementid = "174035";
            var mm_ip = '184.72.184.19';
            var mm_ua = encodeURIComponent(navigator.userAgent);
 			var mm_id = encodeURIComponent( CURRENT_USER_INFO.ip);
                mm_ip = encodeURIComponent( mm_ip);
 			    mm_url = "http://" + mm_adserver + "/getAd.php5" + "?apid=" + mm_placementid+ "&auid=" + mm_id + "&ua=" + mm_ua + "&uip=" + mm_ip;
 	   });

        $("#artImgCont").load(function(){
            $.mobile.loading( 'hide' );
        });
        
        if($.cookie('isCookie')){
   //  		currentArtIndex = 	$.cookie('currentArtIndex');
			// selectedArtist	=	$.cookie('selectedArtist');
			// currentArtistArts	=	$.cookie('currentArtistArts');
			// console.log('hi entered in cookieeeeeee')
			// changeArtTo(currentArtIndex, currentArtIndex + 1);
            console.log('hi entered in cookieeeeeee')
            refreshPage();

		}
});


function displayComicByPanelNumber(){
    $("#goto-comic-dialog").popup("close");
	isOpen = "false";
	if(artPanelsOnly != null){
		var inputidxStr = $.trim($("#comic-current-page-num-txt").val());
		if(inputidxStr.length > 0){
			var idx = parseInt(inputidxStr);
			if(idx >= 0 && idx <= artPanelsOnly.length){
                // TODO enable time track
 				var nxtIndex = artPanelIdex[(idx <= 0 ? 0 : (idx-1))];
 				changeArtTo(currentArtIndex, nxtIndex);
 			}else{
                 //TODO
 				alert("you selected a panel beyond the current number of panels in this stream. " +
 				"Please specify a number between 0 to "+artPanelsOnly.length);
 				$("#comic-current-page-num-txt").val(currentArtIndex);
 			}
	 	}
	 }
}
function displayNetworkAd(networkname){
    $('#artImgCont').css({ 'display': 'none'});
    $('#adNetworkContainer').empty();
    $('#adNetworkContainer').append('<iframe src="network-ads/' + networkname + '.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
    $('#adNetworkContainer').css({ 'display': 'block'});
       
}
function loadNetworkAds(currentAuthor){
    if (currentAuthor.advFile != null && currentAuthor.advFile.length > 0) {
        if (currentAuthor.advertiserUserId == 'AdNetwork') {
            displayNetworkAd('adFrame');
        } else if (currentAuthor.advertiserUserId == 'MillennialAdNetwork'){
            getMilleniaAd();
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&mmnw=1&index=" + CUR_INDEX;
        } else if (currentAuthor.advertiserUserId == 'googleAdSense') {
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&gadnw=1&index=" + CUR_INDEX;
            displayNetworkAd('googleAd');
        }else if (currentAuthor.advertiserUserId == 'leadboltad'){
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&lbadnw=1&index=" + CUR_INDEX;
            displayNetworkAd('leadBoltAd');
        }else if (currentAuthor.advertiserUserId == 'propellerads'){
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&padnw=1&index=" + CUR_INDEX;
            displayNetworkAd('propellerAds');
        }else if (currentAuthor.advertiserUserId == 'airpushads') {
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&apadnw=1&index=" + CUR_INDEX;
            displayNetworkAd('airpushAd');
        } else if (currentAuthor.advertiserUserId == 'mopubads'){
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&mpadnw=1&index=" + CUR_INDEX;
            displayNetworkAd('mopubAds');
        }else if (currentAuthor.advertiserUserId == 'adclickmedias'){
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&adcdnw=1&index=" + CUR_INDEX;
            displayNetworkAd('AdclickMedia');
        }else {
            //TODO 
            anchrs.attr("href", currentAuthor.advFile.targetUrl).attr("target", "_newtab");
            str = "&aid=" + selectedArtist.id + "&advertiserId=" + currentAuthor.advFile.advertiserId + "&id=" + currentAuthor.advFile.id + "&index=" + CUR_INDEX;
            $('#artImgCont').css({ 'display': 'block'});
            $('#adNetworkContainer').css({ 'display': 'none'});
        }
    } else if (currentAuthor.artfile != null && currentAuthor.artfile > 0) {
        $('#artImgCont').css({ 'display': 'block'});           
        $('#adNetworkContainer').css({ 'display': 'none'});            
    }
}	
	function changeImageURL(newurl, artadobj){
		flag = true;
		CUR_UID = Date.now();
		$.mobile.urlHistory.ignoreNextHashChange = true; 
		CUR_ITEM = artadobj;
		replaceToolTips();	 
		CUR_INDEX =  currentArtIndex;
		$.cookie('isCookie', true);    
		$.cookie('currentArtIndex', currentArtIndex);
		$.cookie('currentArtistArts', currentArtistArts);
		$.cookie('selectedArtist', selectedArtist);
		
		if(window.location.href.indexOf("profile.html") == -1 && window.canRunAds === undefined ){
		    str = "&blockAdv=1";
		    $('#artImgCont').css({'display':'none'});
			$('#adNetworkContainer').empty();
			$('#adNetworkContainer').append('<div width="300px" height="250px"  marginwidth ="0px" marginheight="0px" scrolling="no" >"You are using an ad blocker. Comikka artists are supported by ads, and Comikka wont work properly with ad blocking software. Our artists will be very grateful if you turn it off! Thanks!"</div>');
			$('#adNetworkContainer').css({'display':'block'});    
			window.canRunAds=false;
		} else if( !(window.location.href.indexOf("profile.html") == -1) && window.canRunAdsfav === undefined ){
		    str = "&blockAdv=1";
		    $('#artImgCont').css({'display':'none'});
		    $('#adNetworkContainer').empty();
			$('#adNetworkContainer').append('<div width="300px" height="250px"  marginwidth ="0px" marginheight="0px" scrolling="no" >"You are using an ad blocker. Comikka artists are supported by ads, and Comikka wont work properly with ad blocking software. Our artists will be very grateful if you turn it off! Thanks!"</div>');
			$('#adNetworkContainer').css({'display':'block'});    
			window.canRunAdsfav=false;
		} else if(artadobj.artfile != null){str="";
			str = "_"+artadobj.artfile.artistId+"_"+artadobj.artfile.id;
			anchrs.attr("href","javascript:void(0)").attr("target",'');
		} else if(artadobj.advFile != null){
			if(artadobj.advertiserUserId == 'AdNetwork'){
	 			anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
	 			str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+"&adnw=1&index="+CUR_INDEX;
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/adFrame.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
			}else if(artadobj.advertiserUserId == 'MillennialAdNetwork'){
				getMilleniaAd();
	 			anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
	 			str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+ "&mmnw=1&index="+CUR_INDEX;
 			}else if(artadobj.advertiserUserId == 'googleAdSense'){
 				anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
			 	str ="&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+ "&gadnw=1&index="+CUR_INDEX;
			 	$('#artImgCont').css({'display':'none'});
			 	$('#adNetworkContainer').empty();
			 	$('#adNetworkContainer').append('<iframe src="network-ads/googleAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
			 	$('#adNetworkContainer').css({'display':'block'});
 			}else if(artadobj.advertiserUserId == 'leadboltad'){
 				// console.log("leadboltad===================================================================");
 				anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
 				str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+"&lbadnw=1&index="+CUR_INDEX;
 				$('#artImgCont').css({'display':'none'});
 				$('#adNetworkContainer').empty();
 				$('#adNetworkContainer').append('<iframe src="network-ads/leadBoltAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
 				$('#adNetworkContainer').css({'display':'block'});
 			
			}else if(artadobj.advertiserUserId == 'propellerads'){
 				// console.log("propellerads===================================================================");
 				anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
 				str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+ "&padnw=1&index="+CUR_INDEX;
 				$('#artImgCont').css({'display':'none'});
 				$('#adNetworkContainer').empty();
 				$('#adNetworkContainer').append('<iframe src="network-ads/propellerAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
 				$('#adNetworkContainer').css({'display':'block'});
			
	 		}else if(artadobj.advertiserUserId == 'airpushads'){
	 			// console.log("propellerads===================================================================");
	 			anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
	 			str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+ "&apadnw=1&index="+CUR_INDEX;
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/airpushAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
			
	 		}else if(artadobj.advertiserUserId == 'mopubads'){
	 			// console.log("mopubads===================================================================");
	 			anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
	 			str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+	 "&mpadnw=1&index="+CUR_INDEX;
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/mopubAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
			
	 		}else if(artadobj.advertiserUserId == 'adclickmedias'){
	 			// console.log("propellerads===================================================================");
	 			anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
	 			str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+"&adcdnw=1&index="+CUR_INDEX;
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/AdclickMedia.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
			
	 		}else{
 				anchrs.attr("href",artadobj.advFile.targetUrl).attr("target","_newtab");
 				str = "&aid="+selectedArtist.id+"&advertiserId="+ artadobj.advFile.advertiserId+"&id="+ artadobj.advFile.id+"&index="+CUR_INDEX;
 				$('#artImgCont').css({'display':'block'});
 				$('#adNetworkContainer').css({'display':'none'});
 			}
 		}
 		screenName=screenName.replace(/ /g, '+');
	 	window.location.hash = "#comic-view-page?sn="+screenName+str;
	 	$.mobile.loading( 'show' ,{ theme: "b", text: "Loading..." });
	 	console.log(newurl);
		var urlItems = newurl.split('&');
		if(typeof urlItems[1] == 'undefined' || urlItems[1] ==  null){
		   	$("#artImgCont").attr("src", urlItems[0]); 
		   	var window_height = imgViewAreaHeight();
		   	var window_width  = imgViewAreaWidth();
		   	var h;
	    	$("#artImageView").css({'height':window_height,'width':window_width});
	    	$('#artImgCont').centerImage('inside');
	    	
	    	if(jQuery.browser.mobile){
	    	   h = $("#artImgCont").height();
			}else{
				h = window_height;
			}
			$(".eventBox").css({'height':((h) / 2)+'px','width':((window_width) / 2)+'px'});
			$("#bl").css({'top':((h) / 2)+'px'});
			$("#br").css({'top':((h) / 2)+'px'});	
	    	
			if(artadobj.artfile != null){
	    		var cidx = artadobj.artpanelIdx + 1;
	    	if(artPanelsOnly != undefined){
	    		$("#comic-current-page-num-txt").val(cidx);
	    		$("#comic-total-page-num-txt").val("/ " +artPanelsOnly.length);
	    	}
	    }
		if(jQuery.browser.mobile){ 
   			$("#artImgCont").css('left','0px');
   		}	
		}
		if((typeof piwikTracker) !== "undefined"){
			piwikTrack();
		}
	}
	
	function imageresize(){
		var window_height = imgViewAreaHeight();
		var window_width  = imgViewAreaWidth();
		$("#artImageView").css({'height':window_height,'width':window_width});
		$('#artImgCont').centerImage('inside');
	}


	
	function loadComics(userid, cnt,stream){
		secondLoaded = false;	
        currentArtIndex = -1;
        $.cookie('isCookie', false);    
		$.cookie('currentArtIndex', -1);
		$.cookie('currentArtistArts', null);
		$.cookie('selectedArtist', null);
        
		if(cnt <= 0){
	 		alert("That artist is not currently showing any art");
	 		return;
	 	}
		currentuserid = userid;
		if (stream == "ON") {
			loadArtsByArtist();
		    loadComicViewPage();
	            return;
	 	}
	 	if(artistList == null || artistList.length == 0){
	 		loadArtistAndArts();
	 	    loadComicViewPage();
	 	}else{
	 		 for(var i = 0; i < artistList.length; i++){
	 			 if(artistList[i].id == userid){
	 				 selectedArtist = artistList[i];
	 				 break;
	 			 }
	 		 }
	 		 loadArtsByArtist();
             loadComicViewPage();
	 	}
	}
	
	function loadAuthor(userid, cnt, artist){
		if(cnt <= 0){
			alert("That artist is not currently showing any art");
			return;
		}
        currentArtIndex = -1;
        $.cookie('isCookie', false);    
    	$.cookie('currentArtIndex', -1);
		$.cookie('currentArtistArts', null);
		$.cookie('selectedArtist', null);
	 	currentuserid = userid;
	 	selectedArtist = artist
	 	loadArtsByArtist();
	    loadComicViewPage();
	 }

	 // function loadOwnArtsByArtist(){
	 // 	$.getJSON(REST_SERVER+'artist/'+currentuserid+'/arts',
	 // 		function(data) {
	 // 			currentArtistArts = data;
	 // 			loadArtPanelIndex();
	 // 			loadInitialImage();
	 // 			preloadNextImage();
	 // 		});
	 // }

	 function replaceToolTips(){
	 	var artLeft="Click here to go to a Panel by number";
	 	var artRight="Click here to go to Artist list";
	 	var advLeft="Click here to go to the advertiser's page";
	 	var advRight="Click here to go to the advertiser's page";
	 	if(CUR_ITEM.artfile != null){
	 		$("#bl").attr("title", artLeft); 
	 		$("#br").attr("title", artRight); 
	 	}
	 	else{
	 		$("#bl").attr("title", advLeft); 
	 		$("#br").attr("title", advRight); 
	 	}
	 }

	 function loadArtistAndArts(){
	 	$.getJSON(REST_SERVER+'artist/'+currentuserid,
	 		function(data) {
	 			selectedArtist = data;
	 			loadArtsByArtist();
	 		});
	 }

	 function loadInitialImage(){
	 	var imgvalue = {};
	 	imgvalue.artpanelIdx = 0;
	 	if(selectedArtist == null){
	 		loadArtistAndArts();
	 	}
	 	
	 	if(selectedArtist.advertisementfiles != null && selectedArtist.advertisementfiles.length > 0){
	 		imgvalue.advFile = selectedArtist.advertisementfiles[0];
	 		imgvalue.advertiserUserId = selectedArtist.advertiserUserId;
	 		if(selectedArtist.advertiserUserId == 'AdNetwork' ||
	 				selectedArtist.advertiserUserId == 'MillennialAdNetwork' ||
	 					selectedArtist.advertiserUserId == 'googleAdSense' ||
	 						selectedArtist.advertiserUserId == 'leadboltad' || 
	 							selectedArtist.advertiserUserId == 'propellerads'  || 
	 								selectedArtist.advertiserUserId == 'airpushads' ||
	 									selectedArtist.advertiserUserId == 'mopubads' ||
	 										selectedArtist.advertiserUserId == 'adclickmedias'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$("#artImageView").css({'height':'250px',   'width':'300px',   'overflow': 'hidden' }); 
	 			$(".eventBox").css({'height':((250) / 2)+'px',	'width':((300) / 2)+'px'});
	 			$("#bl").css({'top':'0px',      'height':'0px',     'width':'0px',	      });
	 			$("#br").css({'top':'0px',     'height':'0px',     'width':'0px',	      });
	 			$("#tl").css({'top':(0)+'px'});
	 			$("#tr").css({'top':(0)+'px'});
	 			if(selectedArtist.advertiserUserId == 'AdNetwork'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/adFrame.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			}else if(selectedArtist.advertiserUserId == 'MillennialAdNetwork'){
	 				getMilleniaAd();
	 			
	 			}else if(selectedArtist.advertiserUserId == 'googleAdSense'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/googleAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});	 
	 			}
			
	 			else if(selectedArtist.advertiserUserId == 'leadboltad'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/leadBoltAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});	 
	 			}
	 			
	 			else if(selectedArtist.advertiserUserId == 'propellerads'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/propellerAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});	 
	 			}
			
	 			else if(selectedArtist.advertiserUserId == 'airpushads'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/airpushAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});	 
	 			}
			
	 			else if(selectedArtist.advertiserUserId == 'mopubads'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/mopubAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});	 
	 			}
				else if(selectedArtist.advertiserUserId == 'adclickmedias'){
	 				$('#adNetworkContainer').append('<iframe src="network-ads/AdclickMedia.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});	 
	 			}
	 		}else{
	 				$('#artImgCont').css({'display':'block'});
	 				$('#adNetworkContainer').css({'display':'none'});
	 		}
		}
	 	else if(selectedArtist.artfiles != null && selectedArtist.artfiles.length > 0){
	 		imgvalue.artfile = selectedArtist.artfiles[0];
	 	}
	 	else{
	 		if(currentArtistArts != null && currentArtistArts.length > 0){
	 			if(currentFileId != null){
	 				$.each(currentArtistArts, function(idx, vl){
	 					if(currentAdvId != null){ // Load arts
	 						if(vl.advFile != null && vl.advFile.id === currentFileId && idx === currentFileId){
	 							imgvalue = vl;
                 	            currentArtIndex = idx;
                 	            return false;
	 						}
	 					}
	 					else{
	 						if(vl.artfile != null && vl.artfile.id === currentFileId){
	 							imgvalue = vl;
	 							currentArtIndex = idx;
	 							return false;
	 						}
	 					}
	 				});
	 			}
	 		}
	 	}
	 	var imgurl = getImgUrl(imgvalue);
	 	if(imgurl == undefined){
	 	//	loadArtsByArtistOnRefresh(); 		
	 	}else{
	 	if(selectedArtist.advertiserUserId == 'AdNetwork'){
	 		imgurl = imgurl + '&adnw=1';
	 	
	 	}else if(selectedArtist.advertiserUserId == 'MillennialAdNetwork'){
	 			imgurl = imgurl + '&mmnw=1';
	 	
	 	}else if(selectedArtist.advertiserUserId == 'googleAdSense'){
	 			imgurl = imgurl + '&gadnw=1';
	 	
	 	}else if(selectedArtist.advertiserUserId == 'leadboltad'){
	 			imgurl = imgurl + '&lbadnw=1';
	
	 	}	else if(selectedArtist.advertiserUserId == 'propellerads'){
	 			imgurl = imgurl + '&padnw=1';
	 	
	 	}	else if(selectedArtist.advertiserUserId == 'airpushads'){
	 			imgurl = imgurl + '&apadnw=1';
	 	
	 	}	else if(selectedArtist.advertiserUserId == 'mopubads'){
	 			imgurl = imgurl + '&mpadnw=1';
	 	
	 	}	else if(selectedArtist.advertiserUserId == 'adclickmedias'){
	 			imgurl = imgurl + '&adcdnw=1';
	 	}
	 	changeImageURL(imgurl, imgvalue);
	 	currentArtIndex++;
	 	}
	 }

	 function imgViewAreaHeight(){
	 	return $(window).height();
	 }
	 
	 function imgViewAreaWidth(){
	 	return $(window).width();
	 }

	 function imgurl(id){
		 var h = imgViewAreaHeight();
	 	 var w = imgViewAreaWidth();
	 	 return S3_BUCKETURL + currentuserid+"/";
	 }

	 $(document).bind( "pagebeforechange", function( e, data ) {
	 	$(document.body).css({'overflow-y': ''});
	 	if((typeof data.toPage === "string")){
	 		var u = $.mobile.path.parseUrl( data.toPage ),
	 		re = /^#comic-view-page/;
	 		if ( u.hash.search(re) !== -1 ) {
	 			$(document.body).css({'overflow-y': 'hidden'});
	 		}
	 	}
	 	else{
	 		if ( data.toPage.length > 0) {
	 			if($(data.toPage[0]).attr("id") === "comic-view-page"){
	 				$(document.body).css({'overflow-y': 'hidden'});
	 			}
	 		}
	 	}
	 });

	 function getImgUrl(value){
	 	if(value.artfile != null){
			var imgurl = S3_BUCKETURL + value.artfile.artistId + "/" + value.artfile.fileName;
			return imgurl;
		}
		if(value.advFile != null){
			var imgurl =  S3_BUCKETURL + value.advFile.advertiserId + "/" + value.advFile.fileName;
			return imgurl;
		}
	 }

	 var curArtFile;
	 function loadArtImage(artfile){
	 	if(artfile == null || (typeof artfile) === "undefined"){
	 		return;
	 	}
	 	curArtFile = artfile;
	 	var imgurl = getImgUrl(artfile);
	 	changeImageURL(imgurl, curArtFile);
	 }
	
	 
	 function openGotoComicPopup(){
	 	if(secondLoaded){
	 		if(CUR_ITEM.artfile != null){
				$("#goto-comic-dialog").popup("open");
					isOpen="true";
			}else{				
				setTimeout(function(){
					$.post(REST_SERVER + 'adClickThrough', {
						id : CUR_ITEM.advFile.id,
						currentartistid : currentuserid
					}, function(data) {
						timeTracking(CUR_ITEM,"ClickThrough");
						var site = 'http://' + data.response;
                         windowOpenIntent(site);
					});
				},600);
			}
		}
	}

	 function sessionSaving(value,CURRENT_USER_ID ){
	 	var objid = (value.artfile != null) ? value.artfile.id : ((value.advFile != null) ? null : null);
	 	if(objid != null){
	 		setTimeout(function() {
	 			$.post(REST_SERVER+'sessionTrack',{id:objid,userId:CURRENT_USER_ID,artistId:currentuserid}, 
	 					function(data) {
	 			}); 
	 		}, 1800);
	 	}else{
	 		return true;
	 	}
	 }
	 
	 function preloadNextImage(){
	 	var idx = currentArtIndex + 1;
	 	if(currentArtistArts != null && idx < currentArtistArts.length){
	 		var img = new Image();
	 		img.src = getImgUrl(currentArtistArts[idx]);
	 	}
	 }

	
	 function changeArtTo(curIndex, nextIndex){
        console.log('changingggggggggggggg................................')
	 	currentArtIndex = nextIndex;
	 	loadArtImage(currentArtistArts[currentArtIndex]);
	 	preloadNextImage();
	 }

	 $(window).resize(function() {
        var activePage = $.mobile.activePage.attr('id');
        if(activePage === "comic-display-page" && isOpen == "false"){
	 		setTimeout(function(){
	 			if(typeof currentArtistArts != 'undefined' && currentArtistArts != null){
	 				//	console.log("if if");
	 				loadArtImage(currentArtistArts[currentArtIndex]);
	 			}
	 		},900);
	 	}else{
	 		console.log("pop up");
	 	}
	 });

	 function getMilleniaAd(){
	 	var url;
	 	$.get(mm_url, function( xml ) {
	 		var xml = $(xml);
	 		url = xml.find( "url" );
	 		millenUrl=url.text();
	 		console.log( 'Successful cross-domain AJAX request:'+url.text());
	 		$('#artImgCont').css({'display':'none'});
	 		$('#adNetworkContainer').empty();
	 		$('#adNetworkContainer').append('<img src="'+millenUrl+'"  frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></img>');
	 		$('#adNetworkContainer').css({'display':'block'});
	 	},'xml');
	 }

	 function nxtImage(){
	 	if(typeof CUR_ITEM.advFile !== "undefined" && CUR_ITEM.advFile != null){
	 		registerAdDirectClick();
	 	}
	
		if(currentArtIndex != -1){
			timeTracking(currentArtistArts[currentArtIndex],"Click");
		}
	
		if(currentArtistArts != null && (currentArtIndex + 1) < currentArtistArts.length){
	 		if(window.location.href.indexOf("profile.html") != -1 && currentArtIndex != -1){
	 			sessionSaving(currentArtistArts[currentArtIndex+1],CURRENT_USER_ID );
	 		}
	 		changeArtTo(currentArtIndex, (currentArtIndex + 1));
	 		//console.log("currentArtistArts:"+currentArtistArts[currentArtIndex]);
	 		//	console.log("currentArtistArts:"+currentArtistArts[currentArtIndex].advertiserUserId);
	 		if(currentArtistArts[currentArtIndex].advertiserUserId == 'AdNetwork'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/adFrame.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 	
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'MillennialAdNetwork'){
	 			getMilleniaAd();
	 		
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'googleAdSense'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/googleAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'leadboltad'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/leadBoltAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'propellerads'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/propellerAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'airpushads'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/airpushAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no"  ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'mopubads'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/mopubAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no"  ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'adclickmedias'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/AdclickMedia.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no"  ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else{
	 			//$('#artImgCont').attr('src','');
	 			$('#artImgCont').css({'display':'block'});
	 			$('#adNetworkContainer').css({'display':'none'});
	 		}
	 	}else{
	 		if(window.location.href.indexOf("profile.html") != -1 && currentArtIndex != -1){
	 			sessionSaving(currentArtistArts[0],CURRENT_USER_ID );
	 		}
	 		changeArtTo(currentArtIndex, 0);
		
	 		if(currentArtistArts[0].advertiserUserId == 'AdNetwork'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/adFrame.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
		
	 		}else if(currentArtistArts[0].advertiserUserId == 'MillennialAdNetwork'){
	 			getMilleniaAd();
		
	 		}else if(currentArtistArts[0].advertiserUserId == 'googleAdSense'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/googleAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	
	 		}else if(currentArtistArts[0].advertiserUserId == 'leadboltad'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/leadBoltAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
		
	 		}else if(currentArtistArts[0].advertiserUserId == 'propellerads'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/propellerAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
		
	 		}else if(currentArtistArts[0].advertiserUserId == 'airpushads'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/airpushAd.html"width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
	 		
	 		}else if(currentArtistArts[0].advertiserUserId == 'mopubads'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/mopubAds.html"width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
		
	 		}else if(currentArtistArts[0].advertiserUserId == 'adclickmedias'){
	 			$('#artImgCont').css({'display':'none'});
	 			$('#adNetworkContainer').empty();
	 			$('#adNetworkContainer').append('<iframe src="network-ads/AdclickMedia.html"width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 			$('#adNetworkContainer').css({'display':'block'});
		
	 		}else{
	 			//	$('#artImgCont').attr('src','');
	 			$('#artImgCont').css({'display':'block'});
	 			$('#adNetworkContainer').css({'display':'none'});
	 		}
	 	}
	 }
	 
	 function registerAdDirectClick(){
	 	$.post(REST_SERVER + 'adDirectClick', {
	 		id : CUR_ITEM.advFile.id,
	 		currentartistid : currentuserid
	 	},
	 	function(data) {
	 	});
	 }

	 function prvImage(){
	 	var idx = currentArtIndex;
	 	if(!secondLoaded && currentArtIndex == 0){
	 		console.log("Second part not loaded yet!");
	 	}
	 	else{
	 		if(currentArtistArts != null && (currentArtIndex - 1) >= 0){
	 			changeArtTo(currentArtIndex, (currentArtIndex - 1));
	 			if(currentArtistArts[currentArtIndex].advertiserUserId == 'AdNetwork'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/adFrame.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'MillennialAdNetwork'){
						getMilleniaAd();
			
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'googleAdSense'){
					$('#artImgCont').css({'display':'none'});
					$('#adNetworkContainer').empty();
					$('#adNetworkContainer').append('<iframe src="network-ads/googleAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
					$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'leadboltad'){
					$('#artImgCont').css({'display':'none'});
					$('#adNetworkContainer').empty();
					$('#adNetworkContainer').append('<iframe src="network-ads/leadBoltAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
					$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'propellerads'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/propellerAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'airpushads'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe  src="network-ads/airpushAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 				
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'mopubads'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe  src="network-ads/mopubAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtIndex].advertiserUserId == 'adclickmedias'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe  src="network-ads/AdclickMedia.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			}else{
	 				//	$('#artImgCont').attr('src','');
	 				$('#artImgCont').css({'display':'block'});
	 				$('#adNetworkContainer').css({'display':'none'});
	 			}
	 		}
	 		else{
	 			changeArtTo(currentArtIndex, currentArtistArts.length-1);
	 			if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'AdNetwork'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/adFrame.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');	
	 				$('#adNetworkContainer').css({'display':'block'});
		
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'MillennialAdNetwork'){
	 				getMilleniaAd();
		
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'googleAdSense'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/googleAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 				
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'propellerads'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/propellerAds.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'leadboltad'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/leadBoltAd.html" width="300px" height="250px" frameborder="0" marginwidth ="0px" marginheight="0px" scrolling="no" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'airpushads'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/airpushAd.html" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'adclickmedias'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/AdclickMedia.html" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			
	 			}else if(currentArtistArts[currentArtistArts.length-1].advertiserUserId == 'mopubads'){
	 				$('#artImgCont').css({'display':'none'});
	 				$('#adNetworkContainer').empty();
	 				$('#adNetworkContainer').append('<iframe src="network-ads/mopubAds.html" ></iframe>');
	 				$('#adNetworkContainer').css({'display':'block'});
	 			}else{
	 				$('#artImgCont').css({'display':'block'});
	 				$('#adNetworkContainer').css({'display':'none'});
	 			}
	 		}
	 	}
	 }

	 var artPanelIdex = null;
	 var artPanelsOnly = null;
	 var index;
	
	 function loadArtPanelIndex(){
	 	artPanelIdex = new Array();
	 	artPanelsOnly = new Array();
	 	$.each(currentArtistArts, function(idx, value){
	 		if(value.artfile != null){
	 			artPanelIdex[artPanelIdex.length] = idx;
				var artidx = artPanelsOnly.length;
				artPanelsOnly[artidx] = value;
				value.artpanelIdx = artidx;
			}
		});
	 
	 	
		if(!secondLoaded){
		//	$("#bl-goto").attr("title","Showing "+1+" of "+artPanelsOnly.length+ " Arts");
		//	$("#bl-goto").show();
			$("#comic-current-page-num-txt").val(1);
			$("#comic-total-page-num-txt").val("/ " +artPanelsOnly.length);
		}
	}

	 function timeTracking(value,type) {
		var objid = (value.artfile != null) ? value.artfile.id : ((value.advFile != null) ? value.advFile.id : null);
		var objtype = (value.artfile != null) ? "art" : ((value.advFile != null) ? "adv" : null);
		if(objid != null){
			var endTime = new Date().getTime();
			var timeSpent = endTime - startTime;
			startTime = endTime;
	 		setTimeout(function() {
	 			$.post(REST_SERVER + 'usageTime', {
	 				objType : objtype,
	 				uid : CUR_UID,
	 				objId : objid,
	 				duration : timeSpent,
	 				country : CURRENT_USER_INFO.country,
	 				browser : CURRENT_USER_INFO.browser,
	 				os : CURRENT_USER_INFO.OSName,
	 				ip  : CURRENT_USER_INFO.ip,
	 				artistId : currentuserid,
	 				type : type
	 			}, function(data) {
	 			});
	 		}, 900);
	 	}
	 }

    function getUrlVars()     {
   	   var vars = [], hash;
       var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	   for(var i = 0; i < hashes.length; i++) {
           hash = hashes[i].split('=');
    	   vars.push(hash[0]);
    	   vars[hash[0]] = hash[1];
   	   }
       return vars;
    }

