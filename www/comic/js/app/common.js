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
       openFB.init({appId: '258489264507231'});
       // openFB.init({appId: '1471415316497177'});
        document.addEventListener("backbutton", onBackButtonCallback, false);        
    } 
    
    function onBackButtonCallback() { 
        console.log(window.location.href)
        if(isHomeMainPage()) {
            exitAppPopup();
        }else if(isProfileMainPage()){
             logout();
        } else{            
            if(isHomeComicViewPage()){
                window.location.href = 'home.html';
            }else if(isProfileComicViewPage()){
                window.location.href = 'profile.html';
            }else{
                // window.history.back();
            history.go(-1);
            }            
       }
    }   
    
    function exitAppPopup() {
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
           
    function isHomeMainPage(){
        if(window.location.href.indexOf("home.html") > -1 ){
            if(window.location.href.indexOf("comic-view-page") > -1 ||
                window.location.href.indexOf("create-user-page") > -1  ||
                window.location.href.indexOf("keyword-search-page") > -1 ||
                window.location.href.indexOf("about-author-page") > -1 ||
                window.location.href.indexOf("forgot-passowrd-page") > -1 ||
                window.location.href.indexOf("login-page") > -1 ){                    
                    return false;
            }else{
                return true;
            }
        } else {            
            return false;
        }            
    }
    
    function isProfileMainPage(){
        if(window.location.href.indexOf("profile.html") > -1 ){
            if(window.location.href.indexOf("comic-view-page") > -1 ||
                window.location.href.indexOf("profile-setting-page") > -1  ||
                window.location.href.indexOf("keyword-search-page") > -1 ||
                window.location.href.indexOf("about-author-page") > -1 ||
                window.location.href.indexOf("manage-favorite-page") > -1 ){                    
                    return false;
            }else{
                return true;
            }
        } else {            
            return false;
        }            
    }

    function isHomeComicViewPage(){
        if(window.location.href.indexOf("home.html") > -1 ){
            if(window.location.href.indexOf("comic-view-page") > -1){                    
                    return true;
            }else{
                return false;
            }
        } else {            
            return false;
        }            
    }
    
    function isProfileComicViewPage(){
        if(window.location.href.indexOf("profile.html") > -1 ){
            if(window.location.href.indexOf("comic-view-page") > -1 ){                    
                    return true;
            }else{
                return false;
            }
        } else {            
            return false;
        }            
    }