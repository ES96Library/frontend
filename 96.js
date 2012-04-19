
//If there's a search string in the url, set loading graphics, populate model with that search string and then draw 

update_page = function(data){
    m.update(data);
    v.draw_filters(m.get_filters());
    v.draw_grid(m.get_items());
    bind_ui();
};
init_with_everything = function(){
    $.ajax({
        url:'http://hollre.com/items.json',
        dataType:"json",
        context:m,
        success:update_page,
    });
    m.current = [];
};
new_search = function(kv_array){
    var search_json = m.search(kv_array);
    $.ajax({
        type: 'POST',
        url:'http://hollre.com/items/search.json',
        dataType:"json",
        data: search_json,
        context:m,
        success:update_page,
    });
    m.current = kv_array;
};
submit_edit = function(){
//    var data = m.edit(itm);
    var data = {"id":1,"image":"http://s3.amazonaws.com/es96library/images/1/c4fe3da460dd7edd3542b0b2e3919957af9f9bae.jpg?1334771965","thumb":"http://s3.amazonaws.com/es96library/images/1/54b4d7d1d5e9a866b294400697a2752954d68d98.jpg?1334771965","preview":"http://s3.amazonaws.com/es96library/images/1/fbd8471359bd2edd1d190e239bbfc374b2167e47.jpg?1334771965","properties":[["author",[{"id":1,"name":"Thomas Edison"}]],["title",[{"id":2,"name":"The Invention of the Lightbulb: Thomas Edison - With Response by Nicola Tesla"}]],["type",[{"id":3,"name":"Manuscript"}]],["description",[{"id":4,"name":"Detail of the first public demonstration of Thomas Edison's incandescent lighting system in December 1879, at which time the Menlo Park laboratory complex was first electrically lighted. Edit successful."}]]]};
    var id = data.id;
    $.ajax({
        type: 'PUT',
        url:'http://hollre.com/items/'+id+'.json',
        dataType:"json",
        data: data,
        context:m,
        success:update_page,
    });
};

bind_ui = function(){
    //Bind all our UI buttons...
    //When you click the x button on a current filter, it calls m.search()
    $('#facets .close').click(function(){
        var to_remove = $(this).attr('facet');
        var nextsearch = $.extend(true, [], m.current);
        nextsearch.splice(to_remove, 1);
        if (nextsearch.length == 0)
            init_with_everything();
        else
            new_search(nextsearch);
    });
    //When you click on a suggested filter, it calls m.search() 
    $('#facets li a').click(function(){
        var newkey = $(this).attr('facetkey');
        var newval = $(this).attr('facetval');
        var nextsearch = $.extend(true, [], m.current);
        nextsearch.push([newkey,newval]);
        new_search(nextsearch);
    });

    //When you click on an item in the results pane, show the edit modal for that item
    $('#results [item]').click(show_edit_modal);
    //When you click the submit button in the edit modal, it calls m.edit on that item
    //May have to grab and update corresponding item from item list

    //If you're in the grid view, when you click the list tab, switch

    //If you're in the list view, when you click the grid tab, switch
}
show_edit_modal = function(){
			
		
	var i = $(this).attr('item');
	var item_list = m.get_items();
	var itm = item_list[i];
	var html = "";
	html += '<div style="background-color:#fff;width:100%;height:100%;">'

		//check for an image associated with the item, else add the placeholder image
		if(item_list[i].preview) {
			img = item_list[i].preview;
		} else{
			img = this.default_image;
		};

	
	var image1 = new Image();
	image1.onload = function() {
	
		//determine appropriate height and width for the modal
		var maxheight = $(window).height();
		var maxwidth = $(window).width();
	
		maxheight = Math.floor(.85*maxheight);
		maxwidth = Math.floor(.7*maxwidth);
		
		var width = maxwidth;
		var height = maxheight;

		if(Math.floor(1.1*this.width+30) > maxwidth){
			width = maxwidth;}
		else {
			width = Math.floor(1.1*this.width+30);
		}
		
		if(Math.floor(1.1*this.height+30) > maxheight){
			height = maxheight;}
		else {
			height = Math.floor(1.1*this.height+30);
		}

	
		//begin modal content

		//display image on the left
		html += '<div class="imageholder" id="image" style="height:'+height+'px;width:'+width+'px;float:left;overflow:auto;">';
		html += '<img src="' + img + '"id=myimg'+i+' style="padding:15px"></img></div>';

		//display metadata on the right
		html += '<div class="span3" id="metadata" style="padding:15px">';
		//metadata inside a form to allow updating
		html += '<form name="update" action="google.com" method="post">';
		// loop through metadata, adding all available information
		for (var index in itm.metadata){
			html += '<h5>'+ index +'</h5><textarea class="metadataform" name="'+index+'" rows="2" cols="80" style="  border:none;border-color:transparent;outline:none;">'+itm.metadata[index]+'</textarea>';
		}

	
		html += '</form></div>';
		html += '<div class="modal-footer">';
		//html += '<a href="#" class="btn">Close</a>';
		html += '<a href="#" class="btn btn-primary" type="Submit">Save changes</a></div></div>';
		$.colorbox({html:html});
	
		
		$('#colorbox textarea').each(function(){
			var name = $(this).attr('name');
			$(this).typeahead({
				source:m.autocomplete_dict[name],
				mode:'multiple'
			});
		});
		
    }
	image1.src = img;
};


m = new Model();
v = new View();

$.ajax({
    url:'http://hollre.com/properties.json',
    dataType:"json",
    context:m,
    success:m.update_properties,
});
$.ajax({
    url:'http://hollre.com/values.json',
    dataType:"json",
    context:m,
    success:m.update_autocomplete_dict
});
init_with_everything();
