m = new Model();
v = new View();

$('.container').append(JSON.stringify(m.get_items()));
$('.container').append(JSON.stringify(m.get_filters()));
//If there's a search string in the url, set loading graphics, populate model with that search string and then draw 

//Bind all our UI buttons...
//When you click the x button on a current filter, it calls m.search()
//When you click on a suggested filter, it calls m.search() 

//When you click on an item in the results pane, show the edit modal for that item

//When you click the submit button in the edit modal, it calls m.edit on that item
//May have to grab and update corresponding item from item list

//If you're in the grid view, when you click the list tab, switch

//If you're in the list view, when you click the grid tab, switch
