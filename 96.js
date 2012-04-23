
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
new_search = function(query,kv_array){
    var search_json = m.search(query,kv_array,1);
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
    var data = {"item":{
        "values_attributes":{
            "0":{
                "name":"asdf",
                "property_attributes":{
                    "id":"3"
                },
                
            },
        }
    },
    "id":"2"
};
    var id = data.id;
    $.ajax({
        type: 'PUT',
        url:'http://hollre.com/items/'+id+'.json',
        dataType:"json",
        data: data,
        context:m,
    });
};
add_value = function(item_id, prop_name, val){
    var data = {"item":{
        "values_attributes":{
            "0":{
                "name":val,
                "property_attributes":{
                    "name":prop_name
                },
            },
        }
    },
        "id":item_id
    };
    $.ajax({
        type: 'PUT',
        url:'http://hollre.com/items/'+item_id+'.json',
        dataType:"json",
        data: data,
        context:m,
    });
    /*
    var data = {"value":{
        "name":val,
        "item_attributes":{"id":item_id},
        "property_attributes":{"id":prop_id},
    }};
    $.ajax({
        type: 'POST',
        url:'http://hollre.com/values.json',
        dataType:"json",
        data: data,
        context:m,
    });
    */
};
destroy_value = function(id){
    $.ajax({
        type: 'DELETE',
        url:'http://hollre.com/values/'+id+'.json',
    });
};
destroy_item_values = function(item_id){
    var vids = m.value_id_dict[item_id];
    for (var i in vids){
        destroy_value(vids[i]);
        console.log('destroyed value '+vids[i]);
    }
};

bind_ui = function(){
    //Bind all our UI buttons...
    var searchid = '#searchbar';
    $(searchid).submit(function(){
        new_search($(searchid+' input[type="text"]').val(),[],1);
        return false;
    });
    //When you click the x button on a current filter, it calls m.search()
    $('#facets .close').click(function(){
        var to_remove = $(this).attr('facet');
        var nextsearch = $.extend(true, [], m.current);
        nextsearch.splice(to_remove, 1);
        if (nextsearch.length == 0)
            init_with_everything();
        else
            new_search(m.query,nextsearch);
    });
    //When you click on a suggested filter, it calls m.search() 
    $('#facets li a').click(function(){
        var newkey = $(this).attr('facetkey');
        var newval = $(this).attr('facetval');
        var nextsearch = $.extend(true, [], m.current);
        nextsearch.push([newkey,newval]);
        new_search(m.query,nextsearch);
    });
    bind_grid_ui();
}
bind_grid_ui = function(){
    //When you click on the more button, next page loads
    $('#morebutton').click(function(){
        var url = 'http://hollre.com/items/search.json';
        var method = 'POST';
        if (m.query.length == 0 && m.current.length == 0){
            url = 'http://hollre.com/items.json';
            method = 'GET';
        }
        var search_json = m.search(m.query,m.current,m.page+1);
        $.ajax({
            type:method,
            url:url,
            dataType:"json",
            data: search_json,
            context:m,
            success:function(data){
                m.addpage(data);
                v.draw_grid(m.get_items());
                bind_grid_ui();
            },
        });
    });

    //When you click on an item in the results pane, show the edit modal for that item
    $('#results [item]').click(show_edit_modal);
};
show_edit_modal = function(){
			
		
	var i = $(this).attr('item');
    var iid = $(this).attr('iid');
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
        html += '<div class="row">';

		//display image on the left
		html += '<div class="imageholder" id="image" style="height:'+height+'px;width:'+width+'px;float:left;overflow:auto;">';
		html += '<img src="' + img + '"id=myimg'+i+' style="padding:15px"></img></div>';

		//display metadata on the right
		html += '<div class="span4" id="metadata" style="padding:15px">';
		//metadata inside a form to allow updating
		html += '<form name="update" action="google.com" method="post">';
		
		//metadata name and value in different columns of a table
		html += '<table id="mdtable" border="0">';

		// loop through metadata, adding all available information
		for (var index in itm.metadata){
				html += '<tr>';
				html += '<td><center><h5>'+ index +':&nbsp&nbsp</h5></center></td>';

				html += '<td><textarea class="metadataform val" name="'+index+'" rows="2" style="  border:none;border-color:transparent;outline:none;resize:none;max-height:110px">'+itm.metadata[index]+'</textarea></td>';
				html += '</tr>';
				
		}
		
		html += '</table>';
				
			//html += '<h5>'+ index +'</h5><textarea class="metadataform" name="'+index+'" rows="2" cols="80" style="  border:none;border-color:transparent;outline:none;">'+itm.metadata[index]+'</textarea>';

		html += '</form></div></div>';
		html += '<div class="modal-footer">';
		html += '<a href="#" class="btn new_field">New Field</a>';
		html += '<a href="#" class="btn btn-primary submit_edit" type="Submit">Save changes</a></div></div>';
		$.colorbox({html:html,width:maxwidth});
		
		$('#colorbox textarea').each(function(){
			var name = $(this).attr('name');
			$(this).typeahead({
				source:m.autocomplete_dict[name],
				mode:'multiple'
			});
		});

        $('#colorbox .submit_edit').click(function(){
            console.log(iid);
            destroy_item_values(iid);
            var fields = $('#colorbox textarea.val');
            fields.each(function(){
                var vals = $(this).val().split(',');
                var prop_name = $(this).attr('name');
                if (prop_name.length == 0)
                    prop_name = $(this).closest('tr').find('textarea.key').val();
                for (var i in vals){
                    console.log([iid,prop_name,vals[i]]);
                    add_value(iid,prop_name,vals[i]);
                }
            });
            //new_search(m.current);
        });
		
        $('#colorbox .new_field').click(function(){
            html = '<tr><td><textarea class="key metadataform"></textarea></td><td><textarea class="val metadataform" name=""></textarea></td></tr>';
            $('#mdtable').append(html);
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
