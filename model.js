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
    this.query = '';
    this.current = [];
    this.suggested = {};
    this.page = 1;
    this.sort_by = '';
    this.order = 'ASC';

    this.property_dict = {};
    this.autocomplete_dict = {};
    this.value_id_dict = {};
    this.pv_index = {};

}
Model.prototype.get_items = function() {
    //returns the list of items (one liner)
    //dummy list...

    return this.item_list;
}
Model.prototype.get_filters = function(){
    return {"current":this.current, "suggested":this.suggested};
}
Model.prototype.parse = function(json){
    //replaces the current item list with the one supplied here

	//console.log(json);
    var out = [];

    for (var i in json.item){
        var item_json = json.item[i];
        var item_id = item_json[0];
        var new_metadata = {};
        for (var j in item_json[1].properties){
            var metadata_json = item_json[1].properties[j];
            var k = metadata_json[0];
            var vid = metadata_json[1][0].id;
            var v = metadata_json[1][0].name;
            if (item_id in this.value_id_dict)
                this.value_id_dict[item_id].push(vid);
            else
                this.value_id_dict[item_id] = [vid];
            if (k in this.pv_index){
                if (item_id in this.pv_index[k]){
                    this.pv_index[k][item_id].push(vid);
                } else {
                    this.pv_index[k][item_id] = [vid];
                }
            }else{
                this.pv_index[k] = {};
                this.pv_index[k][item_id] = [vid];
            }
            if (k in new_metadata)
                new_metadata[k].push(v);
            else
                new_metadata[k] = [v];
        }
        var new_item = new Item(item_id,item_json[1].image,item_json[1].preview,item_json[1].thumb,new_metadata);
        out.push(new_item);
    }

    return out;
}
Model.prototype.update = function(json){
    this.item_list = this.parse(json);
}
Model.prototype.addpage = function(json){
    var new_items = this.parse(json);
    $.merge(this.item_list,new_items);
}
Model.prototype.update_filters = function(json){
    //store suggested in format
    //{key1:{val1:3,val2:2},key2:{val3:4,val4:1,val5:7}}
    //console.log(json);
    var out = {};
    var out2 = {'':''};

    for (var i in json){
        var ith = json[i];
        var key = ith.name;
        var kid = ith.id;

        out2[kid] = key;
        
        if (!(key in this.autocomplete_dict))
            this.autocomplete_dict[key] = {};

        out[key] = {};
        for (var j in ith.values){
            var jth = ith.values[j];
            var val = jth.name;
            var vid = ith.id;

            this.autocomplete_dict[key][val] = true;

            if (val in out[key])
                out[key][val] += 1;
            else
                out[key][val] = 1;
        }
    }

    this.suggested = out;
    this.property_dict = out2;

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
Model.prototype.search = function(q,facets,page,sortby,sortdir){
    this.page = page;
    out = {"page":page,"sort_by":sortby,"order":sortdir};
    if (facets.length > 0){
        out.pair = [];
        for (var i in facets){
            var facet = facets[i];
            out.pair.push({"property_name":facet[0],"value":facet[1]});
        }
    }
    m.query = q;
    if (q.length > 0)
        out.value = {0:q};
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
