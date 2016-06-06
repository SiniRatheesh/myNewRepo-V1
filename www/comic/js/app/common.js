    var HOST            =   "http://www.comikka.com/";
    var REST_SERVER     = 	HOST + "services/data/";
    var IMAGE_SERVER	= 	HOST + "services/image/";
    var QUERY_SERVER 	= 	HOST + "services/query/"; 
    var EXPORT_SERVER 	= 	HOST + "export";
    var REPORT_SERVER   = 	HOST + "services/returnData/";
    var S3_BUCKETURL	= 	"https://s3.amazonaws.com/Comikka-Resources/Comikka/artImages/";
    
//     $.mobile.routerlite.pageinit("#checkout", function(page){
//     doSomething();
// });
    
    
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);        
    }    
    
    function onDeviceReady() {   
        document.addEventListener("backbutton", onBackButtonCallback, false);        
    } 
    
    function onBackButtonCallback() { 
        console.log(window.location.href)
        if(isHomePage()) {
            exitAppPopup();
        }else if(isProfilePage()){
             logout();
        }
  //       else{
  //           $.cookie('isCookie', false);    
  //   	$.cookie('currentArtIndex', -1);
		// $.cookie('currentArtistArts', null);
		// $.cookie('selectedArtist', null);
  //       console.log('going back....')
  //           window.history.back();
  //       }
    }   
    
    function exitAppPopup() {
        $.cookie('isCookie', false);    
    	$.cookie('currentArtIndex', -1);
		$.cookie('currentArtistArts', null);
		$.cookie('selectedArtist', null);
        navigator.notification.confirm(
            "Do you really want to close this app?", 
            function(buttonIndex){
                ConfirmExit(buttonIndex);
            }, 
            "Confirmation", 
            "Yes,No"
        ); 
    };

    function ConfirmExit(stat){
        if(stat == "1"){           
            if(window.location.href.indexOf("home.html") > -1  ) {
                 navigator.app.exitApp();
            }else if(window.location.href.indexOf("profile.html")){
               logoutAndExit
            }
        }else{
            return;
        };
    };
     
    function logout(){
        $.cookie('isCookie', false);    
    	$.cookie('currentArtIndex', -1);
		$.cookie('currentArtistArts', null);
		$.cookie('selectedArtist', null);
        $.getJSON(REST_SERVER+'logOut',
    					function(data) {
			if (data.response = "success") {
				window.location.href = "home.html";
			}
		});
    }
     
    function logoutAndExit(){
        $.getJSON(REST_SERVER+'logOut',
        				function(data) {
			if (data.response = "success") {
				 navigator.app.exitApp();
			}
		});
    }
           
    function isHomePage(){
        if(window.location.href.indexOf("home.html") > -1 ){
            if(window.location.href.indexOf("comic-view-page") > -1 ||
                window.location.href.indexOf("create-user-page") > -1  ||
                window.location.href.indexOf("keyword-search-page") > -1 ||
                window.location.href.indexOf("about-author-page") > -1 ||
                window.location.href.indexOf("forgot-passowrd-page") > -1 ||
                window.location.href.indexOf("login-page") > -1 ){
                    loadHomePage();
                    return false;
            }else{
                return true;
            }
        } else {
             loadHomePage();
            return false;
        }            
    }
    
    function isProfilePage(){
        if(window.location.href.indexOf("profile.html") > -1 ){
            if(window.location.href.indexOf("comic-view-page") > -1 ||
                window.location.href.indexOf("profile-setting-page") > -1  ||
                window.location.href.indexOf("keyword-search-page") > -1 ||
                window.location.href.indexOf("about-author-page") > -1 ||
                window.location.href.indexOf("manage-favorite-page") > -1 ){
                    console.log('dsadasd ldasd')
                    loadProfileHomePage();
                    return false;
            }else{
                return true;
            }
        } else {
            loadProfileHomePage();
            return false;
        }            
    }
