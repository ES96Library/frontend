m = new Model();
v = new View();

//$('.container').append(JSON.stringify(m.get_items()));
//$('.container').append(JSON.stringify(m.get_filters()));

v.draw_filters(m.get_filters());

v.draw_grid(m.get_items());

//If there's a search string in the url, set loading graphics, populate model with that search string and then draw 

//Bind all our UI buttons...
//When you click the x button on a current filter, it calls m.search()
$('#facets .close').click(function(){
    var to_remove = $(this).attr('facet');
    console.log("removed facet " + to_remove);
    var nextsearch = $.extend(true, [], m.current);
    nextsearch.splice(to_remove, 1);
    m.search(nextsearch);
});
//When you click on a suggested filter, it calls m.search() 
$('#facets li a').click(function(){
    var newkey = $(this).attr('facetkey');
    var newval = $(this).attr('facetval');
    console.log("added facet " + newkey + " : " + newval);
    var nextsearch = $.extend(true, [], m.current);
    nextsearch.push([newkey,newval]);
    m.search(nextsearch);
});

//When you click on an item in the results pane, show the edit modal for that item
console.log($('#results [item]'));
$('#results [item]').click(function(){
    var i = $(this).attr('item');
    var item_list = m.get_items();
    var itm = item_list[i];
    html = "";
    html+= '<div style="width:1200px;background-color:#fff;">'
    html += '<div class="modal-body">'

    //begin modal content
    
    //display image on the left
    html += '<div class="span9" id="image">'
    html += '<img src="' + itm.metadata.img + '"id=myimg'+i+' style="max-width:700px;max-height:400px;"></img></div>'

	//display metadata on the right
	html += '<div class="span3" id="metadata">'
    // loop through metadata, adding all available information
    for (var index in itm.metadata){
        html += '<h5>'+ index +'</h5><p>'+itm.metadata[index]+'</p>'
    }

	html += '</div></div>'
    html += '<div class="modal-footer">'
    html += '<a href="#" class="btn">Close</a>'
    html += '<a href="#" class="btn btn-primary">Save changes</a></div></div>'
    $.colorbox({html:html});
});

//When you click the submit button in the edit modal, it calls m.edit on that item
//May have to grab and update corresponding item from item list

//If you're in the grid view, when you click the list tab, switch

//If you're in the list view, when you click the grid tab, switch
