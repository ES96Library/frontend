function Item(id, images, thumb, metadata){
    //This object has all the metadata for one item
    this.id = id;
    this.images = [];
    this.thumb = thumb;
    this.metadata = metadata;
}

function Model(){
    //This object has a list of Items

    this.item_list = [];
    this.current = [];


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
            for (vindex in itm.metadata[k]){
                var v = itm.metadata[k][vindex];
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
    }

    //console.log(suggested);
    for (var k in suggested){
        var max = 0;
        for (var v in suggested[k]){
            if (suggested[k][v] > max)
                max = suggested[k][v];
        }
        //if (max <= 1 || Object.keys(suggested[k]).length <= 1)
            //delete suggested[k];
    }

    //console.log({"current":this.current, "suggested":suggested});
    return {"current":this.current, "suggested":suggested};
//    return { "current": [["Collection","World's Greatest Library Special Collection"],["Author","Thomas Edison"],["Author","Michael Jordan"]], "suggested": {"Author":["Theodore Roosevelt","John Muir","Susan B. Anthony","Herbert Hoover"], "Location":["Los Angeles","Abu Dhabi","Chicago"], "Type":["Letter","Book","Dunk Footage"] }};

}
Model.prototype.update = function(json){
    //replaces the current item list with the one supplied here

    var out = [];

    //console.log(json);
    for (var i in json.item){
        //console.log(json.item[i][1]);
        var item_json = json.item[i]
        var new_metadata = {};
        for (var j in item_json[1].properties){
            var metadata_json = item_json[1].properties[j];
            console.log(metadata_json);
            var k = metadata_json[0];
            var v = metadata_json[1][0].name;
            if (k in new_metadata)
                new_metadata[k].push(v);
            else
                new_metadata[k] = [v];
        }
        var new_item = new Item(item_json[0],[],item_json[1].thumb,new_metadata);
        out.push(new_item);
    }

    console.log(out);
    this.item_list = out;
}
Model.prototype.search = function(facets){
    //Takes an set of key-value pairs and sends an AJAX request
    //The callback for the AJAX call should probably be update
    alert("New Search! Facets:" + JSON.stringify(facets));

}
Model.prototype.edit = function(item){
    //takes an item object and sends an AJAX edit request
    //should return true on success, false on failure
}
