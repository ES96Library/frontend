function Item(id, image, preview, thumb, metadata){
    //This object has all the metadata for one item
    this.id = id;
    this.image = image;
    this.preview = preview;
    this.thumb = thumb;
    this.metadata = metadata;
}

function Model(){
    //This object has a list of Items

    this.item_list = [];
    this.current = [];
    this.property_dict = {};
    this.prop_id_dict = {};
    this.autocomplete_dict = {};


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
                if ($.inArray([k,v],this.current) == -1){
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
    }

    for (var k in suggested){
        var max = 0;
        for (var v in suggested[k]){
            if (suggested[k][v] > max)
                max = suggested[k][v];
        }
        //if (max <= 1 || Object.keys(suggested[k]).length <= 1)
            //delete suggested[k];
    }

    return {"current":this.current, "suggested":suggested};
//    return { "current": [["Collection","World's Greatest Library Special Collection"],["Author","Thomas Edison"],["Author","Michael Jordan"]], "suggested": {"Author":["Theodore Roosevelt","John Muir","Susan B. Anthony","Herbert Hoover"], "Location":["Los Angeles","Abu Dhabi","Chicago"], "Type":["Letter","Book","Dunk Footage"] }};

}
Model.prototype.update = function(json){
    //replaces the current item list with the one supplied here

	console.log(json);
    var out = [];

    for (var i in json.item){
        var item_json = json.item[i]
        var new_metadata = {};
        for (var j in item_json[1].properties){
            var metadata_json = item_json[1].properties[j];
            var k = metadata_json[0];
            var v = metadata_json[1][0].name;
            if (k in new_metadata)
                new_metadata[k].push(v);
            else
                new_metadata[k] = [v];
        }
        var new_item = new Item(item_json[0],item_json[1].thumb,item_json[1].preview,item_json[1].thumb,new_metadata);
        out.push(new_item);
    }

    this.item_list = out;
}
Model.prototype.update_properties = function(json){
    var out = {};
    var out2 = {};

    for (var i in json){
        out[json[i].name] = json[i].id;
        out[json[i].id] = json[i].name;
    }

    this.property_dict = out;
    this.prop_id_dict = out;
}
Model.prototype.update_autocomplete_dict = function(data){
    for (var i in data){
        var val = data[i];
        var key = m.prop_id_dict[val.property_id];
        if (key in this.autocomplete_dict)
            this.autocomplete_dict[key].push(val.name);
        else
            this.autocomplete_dict[key] = [val.name];
    }
}
Model.prototype.search = function(facets){
    /* out = {};
    for (var i in facets){
        var facet = facets[i];
        out = {"pair[][property_id]":this.property_dict[facet[0]],"pair[][value]":facet[1]};
    }
    */
	
    out = {"pair":[]};
    for (var i in facets){
        var facet = facets[i];
        out.pair.push({"property_id":this.property_dict[facet[0]],"value":facet[1]});
    }
    return out;

}
Model.prototype.edit = function(itm){
    out = {}
    out.id = itm.id;
    out.image = itm.image;
    out.preview = itm.preview;
    out.properties = [];
    for (var k in itm.metadata){
    }
    return out;
}
