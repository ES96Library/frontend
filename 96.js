
//If there's a search string in the url, set loading graphics, populate model with that search string and then draw 

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

bind_ui = function(){
    //Bind all our UI buttons...
    //When you click the x button on a current filter, it calls m.search()
    $('#facets .close').click(function(){
        var to_remove = $(this).attr('facet');
        console.log("removed facet " + to_remove);
        var nextsearch = $.extend(true, [], m.current);
        nextsearch.splice(to_remove, 1);
        new_search(nextsearch);
    });
    //When you click on a suggested filter, it calls m.search() 
    $('#facets li a').click(function(){
        var newkey = $(this).attr('facetkey');
        var newval = $(this).attr('facetval');
        console.log("added facet " + newkey + " : " + newval);
        var nextsearch = $.extend(true, [], m.current);
        nextsearch.push([newkey,newval]);
        new_search(nextsearch);
    });

    //When you click on an item in the results pane, show the edit modal for that item
    $('#results [item]').click(function(){
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

    //begin modal content

    //display image on the left
    html += '<div class="" id="image" style="height:985px;width:640px;float:left;">';
        html += '<img src="' + img + '"id=myimg'+i+' style=""></img></div>';

        //display metadata on the right
        html += '<div class="span3" id="metadata">';
        //metadata inside a form to allow updating
        html += '<form name="update" action="google.com" method="post">';
        // loop through metadata, adding all available information
        for (var index in itm.metadata){

            //determine the size box needed to display this piece of metadata
            //if(itm.metadata[index].length > 1){
            //	console.log('hi');
            //}



            html += '<h5>'+ index +'</h5><textarea class="metadataform" name="'+index+'" rows="2" cols="80" style="  border:none;border-color:transparent;outline:none;">'+itm.metadata[index]+'</textarea>';
                //<input type="text" class="metadataform" name="'+index+'" value="'+itm.metadata[index]+'"/>'
        }



    html += '</form></div>';
        html += '<div class="modal-footer">';
        html += '<a href="#" class="btn">Close</a>';
        html += '<a href="#" class="btn btn-primary" type="Submit">Save changes</a></div></div>';
        $.colorbox({html:html});
    });

    //When you click the submit button in the edit modal, it calls m.edit on that item
    //May have to grab and update corresponding item from item list

    //If you're in the grid view, when you click the list tab, switch

    //If you're in the list view, when you click the grid tab, switch
}


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
};
m = new Model();
v = new View();

$.ajax({
    url:'http://hollre.com/properties.json',
    dataType:"json",
    context:m,
    success:m.update_properties,
});
init_with_everything();
