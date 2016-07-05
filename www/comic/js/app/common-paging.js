$(document)
    .bind("mobileinit", function()
    {
        $.mobile.defaultPageTransition = 'none';
       // $.mobile.ajaxEnabled = 'true';
        $.mobile.allowCrossDomainPages = true;
        $.mobile.page.prototype.options.domCache = true;
    });

$(function(){
   // if (window.location.hash == "#_=_") window.location.hash = ""; 
})
function refreshPage() {
  $.mobile.changePage(
    window.location.href,
    {
      allowSamePageTransition : true,
      transition              : 'none',
      showLoadMsg             : false,
      reloadPage              : true
    }
  );
}

$(document).ajaxStart(function(){ 
    loaderShow();
});

$(document).ajaxStop(function(){
    setTimeout(function() {
        loaderHide();
    }, 300);
});

function loaderShow(){
    $.mobile.loading('show', {
        theme: "b",
        text: "Loading..."
    });
}

function loaderHide(){
    $.mobile.loading('hide');
}

$(document).on("click", "#comicDescription a", function(e){e.preventDefault();
    var link = $(this);    
    var location = link.attr("href");
    windowOpenIntent(location);   
});

function loadHomePage()
{
    // $.mobile.changePage("#home-main-page", { transition: "none" });
    // listMasonry();
    // reloadMasonry();
    window.location.href = "home.html";
}

function loadAboutAuthorPage(){
   $.mobile.changePage("#about-author-page",{ transition: "none"});
}
function historyBack(){
    //window.history.back();
     history.go(-1);
}




function loadSearchPage(){
    $.mobile.changePage("#keyword-search-page",{ transition: "none"});   
}

function loadComicViewPage()
{
    $.mobile.changePage("#comic-display-page",{ transition: "none"});
}
// SHOWING FOOTER FOR ALL PAGE
// $('[data-role=page]').live('pageshow', function (event, ui) {
//       $("#" + event.target.id).find("[data-role=footer]").load("footer.html", function(){
//        //  $("#" + event.target.id).find("[data-role=navbar]").navbar();
//       });
//    });
   
$(document)
    .bind("pagebeforechange", function(e, data)  {
        $(document.body).css( { 'overflow-y': ''});
        if ((typeof data.toPage === "string"))  {
            var u = $.mobile.path.parseUrl(data.toPage),
                re = /^#comic-view-page/;
            if (u.hash.search(re) !== -1)  {
                $(document.body).css({'overflow-y': 'hidden'});
            }
        } else{
            if (data.toPage.length > 0){
                if ($(data.toPage[0]).attr("id") === "comic-view-page"){
                    $(document.body).css({ 'overflow-y': 'hidden'});
                }
            }
        }
    });
    
    function loadHelpPage(){
        var url = "http://comikka.net/index.php/faq-general/faq-comic-fans";
        windowOpenIntent(url);
    }

    function windowOpenIntent(location){
        window.plugins.webintent.startActivity({
            action: window.plugins.webintent.ACTION_VIEW,
            url: location
        }, function() {}, function(){
            console.log('Failed to open URL via Android Intent');
            window.open(url, '_blank', 'location=yes');
        });
    }
    function getDescriptionAboutTheAuthor(artistId){
    	 $('#comicScreenName').text('');
		 $('#comicDescription').text('');
		 $("#comicImages").empty();
		 var flag=false;
		 setTimeout(function() {
			$.getJSON(REST_SERVER+'getArtistById/' + artistId,
			function(data) {
			 	CURRENT_ARTIST = data.artist;
			 	ART_COUNT = data.artist.artcount;
			 	CURRENT_ARTIST_ID = artistId;
				$('#comicScreenName').text(data.artist.screenName);
				if(typeof data.description != 'undefined' && data.description != ''){
					$('#comicDescription').html(data.description).text();
					flag=true;
					if(typeof data.comics != 'undefined' && data.comics != null && data.comics.length > 0){
						 if(data.fromArtFIle) {
							 $.each(data.comics,function(k,v){
								 $("#comic-view-tmpl").tmpl(v.artFile).appendTo("#comicImages").trigger( "create" );
							 });
						 }
						 else {
							 $.each(data.comics,function(k,v){
								 $("#comic-view-tmpl").tmpl(v).appendTo("#comicImages").trigger( "create" );
							 });
						 }
					 }
				}else{
					$('#comicDescription').text('This artist has not yet entered a description of their comic.').css({'color':'red'});
				}
			}); 
 		},1200);
		loadAboutAuthorPage();		
 	 }


    // PROFILE PAGE
    
function loadProfileHomePage(){
   // $.mobile.changePage("#profile-main-page",{transition: "none"});
   //  listMasonry();
   //  reloadMasonry();
   window.location.href = "profile.html";
}
    
    