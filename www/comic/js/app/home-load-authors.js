 var dataLength     	 = 	0;
 var loading  		 = 	false; 
 var fromIndex		 = 	0; 
 var nextFromIndex 	 = 	0;
 var uuid=0;
 var type="loadFirstSetArts";
 var artistList = new Array();
 var ARTIST_LIST = new Array();
 
$(function(){ 
	loadFirstSetAuthors(uuid);
	$(window).scroll(function() { //detect page scroll
       	    var activepage = $.mobile.activePage.attr( "id" );
            if(activepage == "home-main-page" ){   //TODO cross check
		        if($(document).scrollTop() + $(window).height() >= $('body').height())        {//user scrolled to bottom of the page?  
			        loadNextSet();
		        }
  	        }
	});
});

function appendToMasonryList(authorList){
    $("#author-tmpl").tmpl(authorList).appendTo("#masonry-authors-list").trigger( "create" );
	$('#masonry-authors-list').masonry().masonry('reloadItems');
}
function loadFirstSetAuthors(uuid){
    console.log('loading....')
    loaderShow();
   	$.getJSON(REPORT_SERVER+'artistQuery?q=usageTracking&role=ADMIN&uuid='+uuid+'&type='+type+'&fromIndex='+fromIndex,
   	function(data) {
    	if (data.status) {
			 if(data.list != 'undefined' && data.list != null && data.list != ''){
				dataLength = data.list.length;
				artistList = data.list;
				ARTIST_LIST = new Array();
				ARTIST_LIST = data.list;
				nextFromIndex = data.nextFromIndex;
                $('#masonry-authors-list').empty();
                loaderHide();
				appendToMasonryList(data.list);
		   		listMasonry();
			 }else{
                 //TODO
				 alert("Currently not showing any artist");
			 }
    	}else{
			loadFirstSetAuthors(data.uuid);
		}
	}); 
}


function loadNextSet(){
     if(loading==false && dataLength >= 5 )      {//there's more data to load
         loading = true; //prevent further ajax loading
	     setTimeout(function() {
	       	  var activePage = $.mobile.activePage.attr('id');
	       	  if(activePage === "keyword-search-page"){
		   		 solrSearch($("#keyword-search-txt").val());
		   	  }
		   	  uuid=0;
		   	loadNextSetAuthors(uuid);
 		},1200); 
    }
 }
function loadNextSetAuthors(uuid){
    loaderShow();
	$.getJSON(REPORT_SERVER+'artistQuery?q=usageTracking&role=ADMIN&uuid='+uuid+'&type='+type+'&fromIndex='+nextFromIndex,
	function(data) {
		if (data.status) {
			 if(data.list != 'undefined' && data.list != null && data.list != ''){ 
				 $.merge(artistList,data.list);
				 $.merge(ARTIST_LIST, data.list);
                    loaderHide();
                    appendToMasonryList(data.list);
			    	listMasonry();
				 nextFromIndex = data.nextFromIndex;
		         loading = false; 
		         if(data.list.length == 0)
		           	 loading = true;
			}else{
				 loading = true;
			}
		}else{
			loadNextSetAuthors(data.uuid);
		}
	});
}



