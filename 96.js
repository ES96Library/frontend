

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
    location.hash = '';
};
new_search = function(query,kv_array){
    var search_json = m.search(query,kv_array,1);
    $.ajax({
        type: 'POST',
        url:'http://hollre.com/items/search.json',
        dataType:"json",
        data: search_json,
        context:m,
        success:function(data){
            m.current = kv_array;
            update_page(data);
            location.hash = JSON.stringify({q:query,kv:kv_array});
        },
        failure:init_with_everything
    });
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
var activeConnections = 0;
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
    activeConnections += 1;
    $.ajax({
        type: 'PUT',
        url:'http://hollre.com/items/'+item_id+'.json',
        dataType:"json",
        data: data,
        complete: reload_if_done,
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
    console.log('destroyed value '+id);
    activeConnections += 1;
    $.ajax({
        type: 'DELETE',
        url:'http://hollre.com/values/'+id+'.json',
        complete: reload_if_done,
    });
};
reload_if_done = function(){
    activeConnections -= 1;
    if (activeConnections == 0)
        location.reload();
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
    $('#searchbar').submit(function(){
        new_search($('#searchbar input[type="text"]').val(),[],1);
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

    //draw and bind toolbar
    position_toolbar = function(){
        $('#toolbar').css('right',$(window).width()/2 - 940/2 + 'px');
    }
    position_toolbar();
    $(window).resize(position_toolbar);
    init_toolbar = function(){
        var tbhtml = '<button class="btn" id="eselect">Edit Multiple</button>';
        $('#toolbar').html(tbhtml);
        $('#eselect').click(activate_toolbar);

        var thumbs = $('#results [item]');
        thumbs.unbind().click(show_edit_modal);
        thumbs.find('.thumbnail').unbind().removeClass('selected_thumbnail');
    };
    activate_toolbar = function(){
        var tbhtml = '<button class="btn" id="ecancel">Cancel</button><button class="btn btn-success disabled" id="eedit">Click on items to select them</button>';
        $('#toolbar').html(tbhtml);
        $('#ecancel').click(init_toolbar);
        var num_selected = $('.selected_thumbnail').length;
        if (num_selected >= 1){
            $('#eedit').removeClass('disabled').html('Edit Selected Items ('+num_selected+')').click(show_multi_edit_modal);
        }

        $('#results [item]').unbind().find('.thumbnail').click(function(){
            $(this).toggleClass('selected_thumbnail');
            var num_selected = $('.selected_thumbnail').length;
            if (num_selected == 1){
                $('#eedit').removeClass('disabled').html('Edit Selected Items (1)').click(show_multi_edit_modal);
            } else if (num_selected > 1) {
                $('#eedit').html('Edit Selected Items ('+num_selected+')');
            } else {
                $('#eedit').addClass('disabled').html('Click on items to select them').unbind();
            }
        });
    }
    init_toolbar();


    //bind more button for pagination
    bind_more_button = function(){
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
                    if($('#eselect').length == 1)
                        init_toolbar();
                    else
                        activate_toolbar();
                    bind_more_button();
                },
            });
        });
    };
    bind_more_button();

}
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


    var thumbnail = this;
	
	var image1 = new Image();
	image1.onload = function() {
	
	
		//begin modal content
		
		//next and previous buttons in a header
		
		html += '<a href="#" class="btn btn-mini previous-btn" type="Submit">Previous</a>';
		html += '<a href="#" class="btn btn-mini next-btn" type="Submit" style="float:right;">Next</a>';
        
        
        html += '<table id="modaltable">';
        html += '<tr>';
        

		//display image on the left
		html += '<td class="imageholder" id="image">';
		//height:'+height+'px;width:'+width+'px;
		
		html += '<a href="' + img + '" class="myimglink"><img src="' + img + '"id=myimg'+i+' class="myimg"></img></a></td>';

		//display metadata on the right
		html += '<td id="metadata" style="padding:15px">';
		//metadata inside a form to allow updating
		html += '<form name="update">';
		
		//metadata name and value in different columns of a table
		html += '<table id="mdtable" border="0">';

		// loop through metadata, adding all available information
		for (var index in itm.metadata){
				html += '<tr>';
				html += '<td class="keycell"><center><h5>'+ index +':&nbsp&nbsp</h5></center></td>';

				html += '<td><textarea class="metadataform val" name="'+index+'" rows="1">'+itm.metadata[index]+'</textarea></td>';
				html += '</tr>';
				
		}
		
		html += '</table>';

		html += '</form></div></div>';
		html += '<div class="modal-footer">';
		html += '<a class="btn new_field">New Field</a>';
		html += '<a class="btn btn-primary submit_edit" type="Submit">Save changes</a></div></div>';
		$.colorbox({html:html});


		$('#colorbox textarea').each(function(){
			var name = $(this).attr('name');
			$(this).typeahead({
				source:m.autocomplete_dict[name],
				mode:'multiple'
			});
		});

		// on click of submit button, submit metadata
        $('#colorbox .submit_edit').click(function(){
            $(this).unbind().html('Saving...').addClass('disabled');
            console.log(iid);
            destroy_item_values(iid);
            var fields = $('#colorbox textarea.val');
            fields.each(function(){
                var vals = $(this).val().split(',');
                var prop_name = $(this).attr('name');
                if (prop_name.length == 0)
                    prop_name = $(this).closest('tr').find('textarea.key').val();
                for (var i in vals){
                    if (vals[i].length > 0){
                        console.log([iid,prop_name,vals[i]]);
                        add_value(iid,prop_name,vals[i]);
                    }
                }
            });

            //new_search(m.current);
        });
		
		// on click of the new field button, add boxes to input new fields
        $('#colorbox .new_field').click(function(){
            html = '<tr><td><textarea class="key metadataform" rows="1"></textarea></td><td><textarea class="val metadataform" rows="1" name=""></textarea></td></tr>';
            $('#mdtable').append(html);
            
            //var modalheight = $('#colorbox').height();
            //modalheight += 50;
            //$.colorbox.resize({height:modalheight});
            $('.key').focus();
        });

        // next and previous button handler
        // next button
        $('#colorbox .next-btn').click(function(){
			var n= parseInt($(thumbnail).attr('item'))+1;
			var item = ($('[item="'+n+'"]'));
			show_edit_modal.call($('[item="'+n+'"]'));
        });

		// previous button
        $('#colorbox .previous-btn').click(function(){
			var n= parseInt($(thumbnail).attr('item'))-1;
			var item = ($('[item="'+n+'"]'));
			show_edit_modal.call($('[item="'+n+'"]'));
        });
        
        // reset modal edit boxes to original size while they are not being edited
    	$("textarea").blur(function(){
    		$(this).attr('rows','1');
  		});
  		
  		// on focus, expand modal edit box to show all the text it contains
  		$("textarea").focus(function(){
  			rownumber = Math.ceil(($(this).val().length)/30);
    		$(this).attr('rows',rownumber);
  		});
  		
  		
  		
  		

    }
	image1.src = img;
			
};
show_multi_edit_modal = function(){
    var selected = $('.selected_thumbnail').closest('[item]');
    var iids = []
    var item_list = m.get_items();
    var fields = {};
    for (var i=0;i<selected.length;i++){
        var itm = item_list[$(selected[i]).attr('item')];
        iids.push($(selected[i]).attr('iid'));
        console.log(itm.metadata);
        for (var key in itm.metadata){
            var val = itm.metadata[key]
            if (key in fields)
                fields[key].push(val);
            else
                fields[key] = [val];
        }
    }

    html = '<div style="background:#fff;">'


    //metadata inside a form to allow updating
    html += '<form name="update">';

    //metadata name and value in different columns of a table
    html += '<table id="mdtable" border="0" style="width:310px;">';

    html += '<tr>';
    html += '<td><center>Property Name</center></td>';
    html += '<td>Current Values</td>';
    html += '<td>Add to All</td>';
    html += '<td>Delete Existing</td>';
    html += '</tr>';

    // loop through metadata, adding all available information
    for (var index in fields){
        html += '<tr>';
        html += '<td><center><h5>'+ index +':&nbsp&nbsp</h5></center></td>';
        html += '<td style="max-width:600px">'+fields[index]+'</td>';
        html += '<td><textarea class="metadataform val" name="'+index+'" rows="1"></textarea></td>';
        html += '<td><input type="checkbox" pname="'+index+'"></td>';
        html += '</tr>';
    }

    html += '</table>';

    html += '</form>';
    html += '<div class="modal-footer">';
    html += '<a href="#" class="btn new_field">New Field</a>';
    html += '<a href="#" class="btn btn-primary submit_edit" type="Submit">Save changes</a></div></div>';
    $.colorbox({html:html});

    $('#colorbox textarea').each(function(){
        var name = $(this).attr('name');
        $(this).typeahead({
            source:m.autocomplete_dict[name],
            mode:'multiple'
        });
    });

    // on click of submit button, submit metadata
    $('#colorbox .submit_edit').click(function(){
        //destroy_item_values(iid);
        var checks = $('#colorbox input[type="checkbox"]');
        checks.each(function(){
            if($(this).is(':checked')){
                var pname = $(this).attr('pname');
                for (var i in iids){
                    to_destroy = m.pv_index[pname][iids[i]];
                    for (var j in to_destroy){
                        destroy_value(to_destroy[j]);
                    }
                }
            }
        });
        var fields = $('#colorbox textarea.val');
        fields.each(function(){
            var vals = $(this).val().split(',');
            var prop_name = $(this).attr('name');
            if (prop_name.length == 0)
            prop_name = $(this).closest('tr').find('textarea.key').val();
        for (var i in vals){
            if (vals[i].length > 0){
                for (var j in iids){
                    var iid = iids[j];
                    console.log([iid,prop_name,vals[i]]);
                    add_value(iid,prop_name,vals[i]);
                }
            }
        }
        });
    });

    // on click of the new field button, add boxes to input new fields
    $('#colorbox .new_field').click(function(){
        html = '<tr><td><textarea class="key metadataform" rows="1"></textarea></td><td></td><td><textarea class="val metadataform" rows="1" name=""></textarea></td><td></td></tr>';
        $('#mdtable').append(html);

        var modalheight = $('#colorbox').height();
        modalheight += 50;
        $.colorbox.resize({height:modalheight});
        $('.key').focus();
    });
    // reset modal edit boxes to original size while they are not being edited
    $("textarea").blur(function(){
        $(this).attr('rows','1');
    });
    // on focus, expand modal edit box to show all the text it contains
    $("textarea").focus(function(){
        rownumber = Math.ceil(($(this).val().length)/30);
        $(this).attr('rows',rownumber);
    });
}

m = new Model();
v = new View();

$.ajax({
    url:'http://hollre.com/properties.json',
    dataType:"json",
    context:m,
    success:m.update_properties,
    complete:function(){
        if (location.hash.length == 0){
            init_with_everything();
        }else{
            var args = JSON.parse(location.hash.slice(1));
            $('#searchbar input[type="text"]').val(args.q);
            new_search(args.q,args.kv);
        }
    }
});
$.ajax({
    url:'http://hollre.com/values.json',
    dataType:"json",
    context:m,
    success:m.update_autocomplete_dict
});
