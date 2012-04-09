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

//When you click the submit button in the edit modal, it calls m.edit on that item
//May have to grab and update corresponding item from item list

//If you're in the grid view, when you click the list tab, switch

//If you're in the list view, when you click the grid tab, switch
