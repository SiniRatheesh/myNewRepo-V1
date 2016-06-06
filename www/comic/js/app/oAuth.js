$(function(){
    setTimeout(function() {
    	oAuth();	
	}, 600);
});

function oAuth() {
    $.getJSON(REST_SERVER+'userAuthentication',
		function(data) {
			if(data == null || data.userName == null){
				LOGGED_IN_USER = null;
				logout();
			}
			LOGGED_IN_USER = data;
			if(data.response == "notLogged"){
				window.location.href = "home.html";
			}else{
				if((typeof piwikTrack) !== "undefined"){
					piwikTrack();
				}
				if(window.location.href.indexOf("profile.html") != -1){
					$(window.document).trigger("userInfoLoaded");
				}
            }
		},
		function(err){
			console.log(err);
		});
}
function resetSettings(){
    
    var password = $("input#profile-setting-password").val();
	var repwd = $("input#profile-setting-confrm-password").val();
	var email = $("input#profile-setting-email").val();

	if (email == '' && repwd == '' && password == '') {
		showSettingPopupErrorMessage('Please enter any settings to change.');	
		return false;
	}
	if (password == '' && repwd != '') {
		showSettingPopupErrorMessage('Please enter password.');			
		return false;
	}
	if (repwd == '' && password != '') {
	    showSettingPopupErrorMessage('Please enter confirm password.');		
		return false;
	}

	if (password != repwd) {
        $("input#profile-setting-password").val('');
        $("input#profile-setting-confrm-password").val('');
        showSettingPopupErrorMessage('Password and confirm password not matching.Please try again.');
		return false;

	}
	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	if (email != '') {
		if (!testEmail.test(email)) {
            showSettingPopupErrorMessage('Please enter valid email.');			
			return false;
		}
	}
	if (email == '') {
		email = 'undefined'
	}
	if (password == '') {
		password = 'undefined'
	}

	var postdata = {
		fPassword : password,
		fEmail : email
	};
	$.post(REST_SERVER + 'resetSettings', postdata, function(data) {
		if (data.response == "success") {
			$("input#profile-setting-password").val('');
			$("input#profile-setting-confrm-password").val('');
			$("input#profile-setting-email").val('');
            $( "#profile-setting--success-message-popup" ).popup( "open" );            
		} else if (data.response == "failure") {
		    showSettingPopupErrorMessage(data.message);		
		}

	});
}

function showSettingPopupErrorMessage(msg){
    $("#profile-setting-popup-error-message").text(msg);
    $( "#profile-setting-error-message-popup" ).popup( "open" );
}
        			
function trackVisitor(){
    $.getJSON(REST_SERVER+"cachePiwikData", function(data){});
}