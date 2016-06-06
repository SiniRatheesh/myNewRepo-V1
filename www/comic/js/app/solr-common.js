$(function(){
    $.ajax( {
		dataType: "json",
		url: HOST + "/solr/collection1/dataimport?command=full-import",
		success: function(data){
		}
	});

	$.ajax( {
		url: HOST + "/solr/collection1/dataimport?command=status&indent=true&wt=json",
		success: function(data){
		}
	});

	
});

