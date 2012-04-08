function Item(id, metadata){
    //This object has all the metadata for one item
    this.id = id;
    this.metadata = metadata;
}

function Model(){
    //This object has a list of Items

    var metadata1 = {"author":"Thomas Edison",
                     "title":"Invention of the Lightbulb: a bunch of long words that are going to take up space and make us think about how to deal with long titles when writing the view",
                     "type":"Manuscript",
                     "description":"Detail of the first public demonstration of something that Thomas Edison made about incandescent lighting systems in December 1879. Blah blah blah blah blah."};
    var item1 = new Item(1,metadata1);
    var metadata2 = {"author":"Theodore Roosevelt",
                     "title":"Letter to yellow journalsts during the Rough Riders campaign."};
    var item2 = new Item(2,metadata2);
    var metadata3 = {"author":"Michael Jordan",
                     "title":"Letter to Dennis Rodman and Scottie Pippen about John Muir's ridiculous defense",
                     "img":"http://www.exclusivecribs.com/celebrities/michael-jordan/thumbnail/michael_jordan.jpg"};
    var item3 = new Item(3,metadata3);
    var metadata4 = {"author":"John Muir",
                     "title":"Letter to Michael Jordan about TR's sick dunking skills"};
    var item4 = new Item(4,metadata4);
    var metadata5 = {"author":"Michael Jackson",
                     "title":"CHAMON-AAH!"};
    var item5 = new Item(5,metadata5);
    this.item_list = [item1,item2, item3, item4, item5];

    this.current = [["author","Michael Jordan"]];
}
Model.prototype.get_items = function() {
    //returns the list of items (one liner)
    //dummy list...

    return this.item_list;
}
Model.prototype.get_filters = function(){
    //returns filters in the format
    //{ "current": [["key1","value1"],["key2","value2"]]
    //  "suggested": key3:{value5:11,value6:1}, key2:{value7:9,value8:3} }

    var suggested = {};
    for (var i in this.item_list){
        var itm = this.item_list[i];
        for (var k in itm.metadata){
            var v = itm.metadata[k];
            if (k in suggested){
                if (v in suggested[k])
                    suggested[k][v] += 1;
                else
                    suggested[k][v] = 1;
            }
            else{
                suggested[k] = {};
                suggested[k][v] = 1;
            }
        }
    }

    console.log({"current":this.current, "suggested":suggested});
    return {"current":this.current, "suggested":suggested};
//    return { "current": [["Collection","World's Greatest Library Special Collection"],["Author","Thomas Edison"],["Author","Michael Jordan"]], "suggested": {"Author":["Theodore Roosevelt","John Muir","Susan B. Anthony","Herbert Hoover"], "Location":["Los Angeles","Abu Dhabi","Chicago"], "Type":["Letter","Book","Dunk Footage"] }};

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
