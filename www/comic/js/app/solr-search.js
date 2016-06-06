function solrSearch(value){
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
			$.each(ARTIST_LIST, function(k,v){
				if( $.inArray(v.id, ids) > -1 && $.inArray(v.id, addedPanels) < 0) {
					 addedPanels.push(v.id);
					 $("#author-tmpl").tmpl(v).appendTo("#masonry-authors-search-list").trigger( "create" );
					 reloadMasonry();
					 listMasonry();
				}
			});
            console.log('addedPanels : '+ ids.length)
			addedPanels = [];
		}
	});
}

$(document).on("pageinit","#keyword-search-page",function(){
    $("#keyword-search-txt").keypress(function (e) {
        if (e.which == 13 && typeof $("#keyword-search-txt").val() != 'undefined' && $("#keyword-search-txt").val() != '') {
    	loading=false;
		loadNextSet();
      	$('#searchResultMsg').show();
		$('#searchResultMsg').text("Search Result for  "+ '"'+ $("#keyword-search-txt").val() +'"');
		$("#keyword-search-txt").blur();
       }
    });
 });