var app = angular.module('comicApp', ['pascalprecht.translate']);

	
	

function localeController($scope,$rootScope,$translate) {

		
	 var languageList = new Array();
	 languageList.push("English");
	 languageList.push("Spanish");
	 languageList.push("Chinese");

	 $scope.languageList = languageList;
	 $scope.changeLanguage = function(language){
		if(language == 'English'){
			$translate.uses('english');
			localStorage.preferedLanguage = 'english';
            loadHomePage();
		}else if(language == 'Spanish'){
			$translate.uses('spanish');
			localStorage.preferedLanguage = 'spanish';
            loadHomePage();
		}else if(language == 'Chinese'){
			$translate.uses('chinese');
			localStorage.preferedLanguage = 'chinese';
            loadHomePage();
		}
		
	 };
	 
	
 }

app.config(['$translateProvider', function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		  prefix: '../js/lib/angular/locale/',
		  suffix: '.json'
		});
	
	var preferredLanguage = localStorage.preferedLanguage;
	if(typeof preferredLanguage != 'undefined' && preferredLanguage != null){
		$translateProvider.preferredLanguage(preferredLanguage);
	}else{
		$translateProvider.preferredLanguage('english');
	}
		
}]);
