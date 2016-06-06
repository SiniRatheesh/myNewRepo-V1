var customdata    		=	[];
var CURRENT_USER_ID 	= 	11;
var startTime 			= 	new Date().getTime();
var ARTIST_LIST			= 	new Array();
var ALL_ARTIST_LIST 	= 	new Array();
var CURRENT_ARTIST_ID;
var ART_COUNT ;
var CURRENT_ARTIST;		
var ARTIST_ONLINE_DATA;
var loadedFromServer=false;
var secondLoaded = false;
var screenName;
var loadinitialImageFavourite = false;
var artistList = new Array();
var FAV_ARTIST_LIST;

$(window.document).bind("userInfoLoaded", function(){
    CURRENT_USER_ID = LOGGED_IN_USER.user.id;
    loadFavouriteAuthors(CURRENT_USER_ID,function(){
    });
});

function loadFavouriteAuthors(CURRENT_USER_ID,callback) {
	CURRENT_USER_ROLE = LOGGED_IN_USER.user.role;
	CURRENT_USER_STATUS = LOGGED_IN_USER.user.artiststatus ;
	
	setTimeout(function(){
		$.getJSON( REST_SERVER+'getCustomData',function(customdata) {
				if(typeof customdata != 'undefined'  && customdata != null){
					 if(customdata[0].artistselfview==true && CURRENT_USER_ROLE=="ARTIST"){
						 setTimeout(function(){
							 $.getJSON(REST_SERVER+'artist/selfview/'+LOGGED_IN_USER.user.id,function(selfData) {
								$('#masonry-favorite-authors-list').empty();
                                $("#author-own-view-tpl").tmpl(selfData).appendTo("#masonry-favorite-authors-list").trigger( "create" );
                                listMasonry();
                                ARTIST_LIST = selfData;
                                selectedArtist = selfData;
							 });
						 },600);
					 }else{
						 $("#manage-favorites-link").css({'display':'block'});
						 laodFavArtists(LOGGED_IN_USER.user.id,function(){
								loadArtistList();
							});
					 }
											 
				}else{
					 $("#manage-favorites-link").css({'display':'block'});
					laodFavArtists(LOGGED_IN_USER.user.id,function(){
						loadArtistList();
					});
				}
		});
   },1200); 			
}

function laodFavArtists(id,callback){
	$.getJSON(REST_SERVER+'list/favouriteOnlineArtist/'+id,
		function(data) {
			if (callback != null) {
				callback();
			}
			if(typeof data != "undefined" && data != null && data !=0){
				if (data.response == "loginAgain") {
					window.location.href = "home.html";
				}else{
					$('#masonry-favorite-authors-list').empty();
					$("#favorite-author-tmpl").tmpl(data).appendTo("#masonry-favorite-authors-list").trigger( "create" );
                     listMasonry();
					artistList = data;
					FAV_ARTIST_LIST = null;
					FAV_ARTIST_LIST = data;
					ARTIST_LIST = data;
				}
			} else {
				FAV_ARTIST_LIST = 0;
				$("#masonry-favorite-authors-list").empty();
				$("#no-favorite-msg").css({'display':'block'});							
			}
	});
}

function loadArtistList() {    
	CURRENT_USER_STATUS 	= 	LOGGED_IN_USER.user.artiststatus ;
	CURRENT_USER_ROLE 		= 	LOGGED_IN_USER.user.role;
	$("#masonry-manage-authors-list").empty();
	setTimeout(function() {
		$.getJSON(REST_SERVER+'listartistonline/ARTIST',
			function(data) {
                if(data != 'undefined' && data != null && data != ''){ 
				onlineArtistArray = data;
				var present = false;
			    $.each(onlineArtistArray, function(k,v){
					if(LOGGED_IN_USER.user.id == v.id ) {					
						present = true;
					}
				});
				if(present == false && CURRENT_USER_ROLE == "ARTIST"){
				}
				ALL_ARTIST_LIST = onlineArtistArray;
				artistList = ALL_ARTIST_LIST; 
				$("#manage-author-view-tmpl").tmpl(onlineArtistArray).appendTo("#masonry-manage-authors-list").trigger("create");
				$(".artistcb").attr('checked', false);
				$(".comicCb").attr('checked', false);
				$.each(FAV_ARTIST_LIST, function(index, value) {
					$("input#cbArtist-" + value.id).attr("checked", true);
					$("input#cbComic-" + value.id).attr("checked", true);
				});
			}
		});

	},600);
}

function deleteArtist(id) {
	var artistName;
	for(var i = 0; i < ARTIST_LIST.length; i++){						
  		var v = ARTIST_LIST[i];			      		
  		if(v.id == id){
            console.log('qwew' + v.userid)
			artistName = v.userid;
            openDeleteConfirmationDialog(id,artistName);
		}						
	}
    	
}

function openDeleteConfirmationDialog(id,artistName){
    navigator.notification.confirm(
        "Are you sure you want to delete '"+ artistName +"' from your favorites ?", 
        function(buttonIndex){
            confirmDelete(buttonIndex,id);
        }, 
        "Confirmation", 
        "Yes,No"
    ); 
}

function confirmDelete(stat,id){
    if(stat == "1"){           
        doDeletion(id);
    }else{
        return;
    };
};

function doDeletion(id){
    $.ajax({
	    url: REST_SERVER+"artist/deleteFavouriteArtist/"+id+"/"+CURRENT_USER_ID,
		type : "DELETE",
		dataType : 'text',
		success : function() {
			$("#favli-" + id).fadeOut('slow', function() {
				$("#favli-" + id).remove();
			});
			$("input#cbArtist-" + id).attr("checked", false);
		},
		error : function() {
            //TODO
			alert("Error in deleting artist from favorites");
		}
	});
  	for(var i = 0; i < ARTIST_LIST.length; i++){
	    var v = ARTIST_LIST[i];			      		
	    if(v.id == id){
			ARTIST_LIST.splice(ARTIST_LIST.indexOf(v),1);
		}						
	}
	if(ARTIST_LIST.length == 0){
		$("#masonry-favorite-authors-list").empty();
		$("#no-favorite-msg").css({'display':'block'});		
	}
}

function loadArtsByArtist() {
    $.getJSON(REST_SERVER+'artist/'+currentuserid+'/artsize',
        function(data) { 
    	    totArts = data.artCount;
    	    $.getJSON(REST_SERVER+'artist/'+currentuserid+'/arts/parts/fav',
    	        function(value) {   
            		currentArtistArts=value.response;
            		$.each(value.userID, function(idx, vl){
            			userId=vl.userid;
            			if(vl.screenName != undefined){
            				screenName=vl.screenName;
            			}
            		});
    		        loadArtPanelIndex();
            		if (value.index == "noSession" || currentAdvId != null
            				|| currentFileId != null) {
            			loadInitialImage();
            			preloadNextImage();
            		} else {    			
            			loadInitialImagebyPreviousSession(value.index);
                        preloadNextImage();
            		}
            		if(value.index !== "noSession" ){
            			$.getJSON(REST_SERVER+'artist/'+currentuserid+'/arts/fav/'+value.index,
            			function(datas) {
            				if(datas.response != null)		{
            					$.merge(currentArtistArts,datas.response);
            				}
            				if(datas.prevData != null)	{
            					$.merge(datas.prevData,currentArtistArts);
            					currentArtistArts=[];
            					currentArtistArts=datas.prevData;
            				}
            				secondLoaded = true;
            				loadArtPanelIndex();
            				$("#comic-total-page-num-txt").val("/ " +totArts);
            			});
            		}else{
    			        secondLoaded = true;
    		        }
    	       });
     });
}

function loadInitialImagebyPreviousSession(index) {
	currentArtIndex = index;
	index=index-index;
	var file = currentArtistArts[index];
	var imgurl = getImgUrl(file);
	changeImageURL(imgurl, file);
	if(currentArtIndex != 1){
		$("#comic-current-page-num-txt").val(currentArtIndex+1);
	}
}

function loadComicsOfComic(){
	loadAuthor(CURRENT_ARTIST_ID,ART_COUNT,CURRENT_ARTIST);
}

function loadArtsOfComic(id,count){
	  $.each(ALL_ARTIST_LIST,function(k,v){
	  if(v.id == id){
		  loadAuthor(id,count,v);
 	 }
  });
}

function deleteComicFromFavorites(id){
    $.ajax({
      url: REST_SERVER+"artist/deleteFavouriteArtist/"+id+"/"+CURRENT_USER_ID,
    	type : "DELETE",
    	dataType : 'text',
    	success : function() {
    	 	$("#favli-" + id).fadeOut('slow', function() {
    			$("#favli-" + id).remove();
    		});  
    		$("input#cbArtist-" + id).attr("checked", false);
            
    	},
    	error : function() {
    		alert("Error in deleting artist from favorites");
    	}
    });

    for(var i = 0; i < ARTIST_LIST.length; i++){						
        var v = ARTIST_LIST[i];			      		
    	if(v.id == id){
    		ARTIST_LIST.splice(ARTIST_LIST.indexOf(v),1);
    	}						
    }
    if(ARTIST_LIST.length == 0){
    	$("#masonry-favorite-authors-list").empty();
		$("#no-favorite-msg").css({'display':'block'});		
	}
}
          
   	function saveComicToFavorites(id){
		$.post(REST_SERVER+'favouriteArtists/save',	{
			artistId:id,userId:CURRENT_USER_ID},
			function(data, textStatus) {
				$("#no-favorite-msg").css({'display':'none'});
				$.each(ALL_ARTIST_LIST, function(k,v){
					if(v.id == id ) {
						artistList.push(v);
                        ARTIST_LIST.push(v);
						$("#favorite-author-tmpl").tmpl(v).appendTo("#masonry-favorite-authors-list").trigger( "create" );
					}
				});
		});
    }	 
    	 
    function addToFavouriteArtist(id) {
    	if($('#cbArtist-'+id).is(':checked')){
    		saveComicToFavorites(id);
    	}else{
    		deleteComicFromFavorites(id)
    	}
    }	
    function addComicToFavouriteArtist(id) {
    	if($('#cbComic-'+id).is(':checked')){
    		saveComicToFavorites(id);
    	}else{
    		deleteComicFromFavorites(id)
    	}
    }	
    
    function comicToFavorites(){
        saveComicToFavorites(CURRENT_ARTIST_ID);	
	}
     