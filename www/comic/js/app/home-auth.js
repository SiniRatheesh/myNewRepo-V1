function doLogin(){
    var un =$("input#lUsername").val();
    var pw = $("input#lPassword").val();
    if(un != '' && pw != ''){
        authentication(un,pw);
    }else{
        return;
    }
}

function authentication(un,pw){
    $.post(REST_SERVER+'loginAuthentication', {userName:un, password:pw},
		function(data) {                
			if(data.response == "exists"){   /// need tocall user authentication
				oAuth();
			}else if(data.response == "notExists") {
                showLoginPopupErrorMessage();				
            }else if(data.response == "sameSession") {
			    window.location.href = 'profile.html';
			}    			
	},"json");
}


function oAuth(){
	$.getJSON(REST_SERVER+'userAuthentication',
    		function(data) {
				if(data == null || data.userName == null){
                    showLoginPopupErrorMessage();
				}if(data.response == "notLogged"){
                    showLoginPopupErrorMessage();					
				}else{
    			    if(data.role == "USER"){
    				    getCustomSettings();
        			}else{				
    				    window.location.href = 'profile.html';
    				}
				}                
			},
			function(err){
				console.log(err);
			});
}

function getCustomSettings(){
    $.getJSON(REST_SERVER+'getCustomData',
    	function(userdata) {
       		if(userdata[0].loginavailable==true){
    			window.location.href = 'profile.html';
    		}else{                      
                navigator.notification.alert(
                    'Sorry, User login is temporarily disabled.',  // message
                     loadHomePage,         // callback
                    'User Login',            // title
                    'OK'                  // buttonName
                );
    		}
    	});
}

function showLoginPopupErrorMessage(){
    $("#login-popup-error-msg").text('The username or password you entered was not found.');
    $( "#login-message-popup" ).popup( "open" );
}

function validateAndSendResetPasswordLink(){
    var email =$("input#fEmail").val();
    if(email == ''){
        return;
    }else{
        sendResetPasswordLink(email);
    }
}

function sendResetPasswordLink(email){
   	$.post(REST_SERVER+'emailAuthentication',{email:email,loginType:1},
        function(data) {
			if(data.response == "exists"){
				$( "#forgot-password-success-message-popup" ).popup( "open" );
			} 
			else if(data.response == "notExists") {
				$( "#forgot-password-error-message-popup" ).popup( "open" ) ;
			}
    });
}

function newUserRegistration() {
	var pw =$("input#new-password").val();
	var un = $("input#new-username").val();
	var email = $("input#new-email").val();
    
	if(un==''){
        var msg = 'Please enter username' ;
		showRegistrationPopupErrorMessage(msg);
		return false;  
	}
	if(pw==''){
        var msg = 'Please enter password' ;
    	showRegistrationPopupErrorMessage(msg);
		return false; 
	}
	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	if(email==''){
        var msg = 'Please enter email' ;
    	showRegistrationPopupErrorMessage(msg);
		return false;  
	}else{
		if (!testEmail.test(email)){
            var msg = 'Please enter valid email' ;
    	    showRegistrationPopupErrorMessage(msg);
			return false;
		}
	}

	var resturl = REST_SERVER+'newUserRegistration';
	$.post(resturl,{userName:un, password:pw,email:email},
	function(data) {		
			var msg = data.message ;
            showRegistrationPopupMessage(data.message);
	});
}

function showRegistrationPopupMessage(msg){
    $("#create-user-popup-message").text(msg);
    $( "#create-user-message-popup" ).popup( "open" );
}
    				