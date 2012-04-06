function Item(id, metadata){
    //This object has all the metadata for one item
    this.id = id;
    this.metadata = metadata;
}

function Model(){
    //This object has a list of Items

}
Model.prototype.get_items = function() {
    //returns the list of items (one liner)
    //dummy list...
    var metadata1 = {"author":"Thomas Edison",
                     "title":"Invention of the Lightbulb: a bunch of long words that are going to take up space and make us think about how to deal with long titles when writing the view",
                     "type":"Manuscript",
                     "description":"Detail of the first public demonstration of something that Thomas Edison made about incandescent lighting systems in December 1879. Blah blah blah blah blah."};
    var item1 = new Item(1,metadata1);
    var metadata2 = {"author":"Theodore Roosevelt",
                     "title":"Letter to yellow journalsts during the Rough Riders campaign."};
    var item2 = new Item(2,metadata2);
    var metadata3 = {"author":"Michael Jordan",
                     "title":"Letter to Dennis Rodman and Scottie Pippen"};
    var item3 = new Item(3,metadata3);
    var metadata4 = {"author":"John Muir",
                     "title":"Letter to Michael Jordan about TR's sick dunking skills"};
    var item4 = new Item(4,metadata4);
    var metadata5 = {"author":"Michael Jackson",
                     "title":"CHAMON-AAH!"};
    var item5 = new Item(5,metadata5);
    return [item1,item2, item3, item4, item5];
}
Model.prototype.get_filters = function(){
    //returns filters in the format
    //{ "current": key1:[value1,value2], key2:[value3,value4], 
    //  "suggested": key3:[value5,value6], key2:[value7,value8] }

    return { "current": [["Collection","World's Greatest Library Special Collection"],["Author","Thomas Edison"],["Author","Michael Jordan"]], "suggested": {"Author":["Theodore Roosevelt","John Muir","Susan B. Anthony","Herbert Hoover"], "Location":["Los Angeles","Abu Dhabi"] }};
}
Model.prototype.update = function(items){
    //replaces the current item list with the one supplied here
}
Model.prototype.search = function(facets){
    //Takes an set of key-value pairs and sends an AJAX request
    //The callback for the AJAX call should probably be update
}
Model.prototype.edit = function(item){
    //takes an item object and sends an AJAX edit request
    //should return true on success, false on failure
}
