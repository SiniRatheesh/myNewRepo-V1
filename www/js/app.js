    function onLoad() {
      //  window.location="comic/views/home.html";
        document.addEventListener("deviceready", onDeviceReady, false);        
    }    
    
    function onDeviceReady() {   
        document.addEventListener("backbutton", onBackButtonCallback, false);
        var networkState = checkConnection();        
        if (networkState == Connection.NONE) {       
            window.location="404.html";
        } else {
            window.location="comic/views/home.html";
        }
    } 
    
    function onBackButtonCallback() {  
        exitAppPopup();
    }

    
    function checkConnection() {
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
      
       return networkState;
          
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
            navigator.app.exitApp();
        }else{
            return;
        };
    };
     
     
     

           
        