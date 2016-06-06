function solrSearch(value){
    console.log('solr search')
	$("#masonry-authors-search-list").empty();
	$.ajax( {
		dataType: "json",
		url: HOST + "/solr/select",
		data: {
			q: "KEYWORD:"+value,
			wt:"json"
		},
		success: function(data){
			var array = data.response.docs;
			var ids = new Array();
			if(array.length != 0){
				$.each(array, function(k,v){
					ids.push(v.ARTIST_ID);
				})	
			}
			var addedPanels = [];
			$.each(ALL_ARTIST_LIST, function(k,v){
				if( $.inArray(v.id, ids) > -1 && $.inArray(v.id, addedPanels) < 0) {
					 addedPanels.push(v.id);
					 $("#author-search-view").tmpl(v).appendTo("#masonry-authors-search-list").trigger( "create" );
					 reloadMasonry();
					 listMasonry();
				}
			});
			addedPanels = [];
		}
	});
}

$(document).on("pageinit","#keyword-search-page",function(){
    $("#keyword-search-txt").keypress(function (e) {
        console.log('solllllrrrrrrrrrrrrrr.................')
        if (e.which == 13 && typeof $("#keyword-search-txt").val() != 'undefined' && $("#keyword-search-txt").val() != '') {
    	solrSearch($("#keyword-search-txt").val())
      	$('#searchResultMsg').show();
		$('#searchResultMsg').text("Search Result for  "+ '"'+ $("#keyword-search-txt").val() +'"');
		$("#keyword-search-txt").blur();
       }
    });
 });