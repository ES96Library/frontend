function Item(){
    //This object has all the metadata for one item
}

function Model(){
    //This object has a list of Items

}
Model.prototype.get_items(){
    //returns the list of items (one liner)
}
Model.prototype.get_filters(){
    //returns filters in the format
    //{ "current": key1:[value1,value2], key2:[value3,value4], 
    //  "suggested": key3:[value5,value6], key2:[value7,value8] }
}
Model.prototype.update(items){
    //replaces the current item list with the one supplied here
}
Model.prototype.search(facets){
    //Takes an set of key-value pairs and sends an AJAX request
    //The callback for the AJAX call should probably be update
}
Model.prototype.edit(item){
    //takes an item object and sends an AJAX edit request
    //should return true on success, false on failure
}
