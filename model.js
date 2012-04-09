function Item(id, metadata){
    //This object has all the metadata for one item
    this.id = id;
    this.metadata = metadata;
}

function Model(){
    //This object has a list of Items

    var metadata1 = {"author":["Michael Jordan"],
                     "title":["Invention of the Lightbulb: Edison is a credit stealing SOB. A bunch of long words that are going to take up space and make us think about how to deal with long titles when writing the view"],
                     "type":["Manuscript"],
                     "year":["1979"],
                     "description":["Detail of the first public demonstration of something that Michael Jordan made about incandescent lighting systems in December 1879. Blah blah blah blah blah."],
                     "img":["http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Jordan_by_Lipofsky_16577.jpg/170px-Jordan_by_Lipofsky_16577.jpg"],
                     "topic":["basketball"]};
    var item1 = new Item(1,metadata1);
    var metadata2 = {"author":["Michael Jordan"],
                     "title":["Letter to yellow journalsts during the Rough Riders campaign for the NBA finals in 1994."],
                     "type":["Manuscript"],
                     "year":["1994"],
                     "description":["Little known fact: the Pistons used to be known as the 'Rough Riders.'"],
                     "img":["http://nbalegend.net/wp-content/uploads/2011/10/michael-jordan-slam-dunk--poster.jpg"],
                     "topic":["basketball"]};
    var item2 = new Item(2,metadata2);
    var metadata3 = {"author":["Michael Jordan"],
                     "type":["Manuscript"],
                     "title":["Letter to Dennis Rodman and Scottie Pippen about John Muir's ridiculous defense"],
                     "year":["1994"],
                     "description":["Seriously, he could block a bullet from 10 feet off"],
                     "img":["http://www.exclusivecribs.com/celebrities/michael-jordan/thumbnail/michael_jordan.jpg"],
                     "topic":["basketball"]};
    var item3 = new Item(3,metadata3);
    var metadata4 = {"author":["Michael Jordan"],
                     "type":["Manuscript"],
                     "title":["Letter to John Muir about TR's sick dunking skills"],
                     "year":["1994"],
                     "description":["I call him 'Air Teddy'"],
                     "img":["http://media-3.web.britannica.com/eb-media//02/119402-050-274FAD64.jpg"],
                     "topic":["basketball"]};
    var item4 = new Item(4,metadata4);
    var metadata5 = {"author":["Michael Jordan"],
                     "type":["Video Interview"],
                     "title":["Why the Bobcats won't make the NBA finals"],
                     "description":["Michael Jordan sits down with ESPN.com to discuss his Charlotte-based team's chances at the finals this year. Yes, they're actualy a team. Yes, I know you've never heard of them before. No. They're not good."],
                     "year":["2012"],
                     "img":["http://img.phombo.com/img1/photocombo/37/Charlotte_Bobcats.jpg"],
                     "topic":["basketball"]};
    var item5 = new Item(5,metadata5);
	var metadata6 = {"author":["Michael Jordan"],
                     "type":["Video Interview"],
                     "title":["Comparing LeBron's ring collection and mine"],
                     "year":["2012"],
                     "description":["Let me see, I've got 1,2,3,4,5,6. LeBron's got... well, shit, what can I say."],
                     "img":["http://www.ebengregory.com/wp-content/uploads/2011/09/IFWT-Michael-Jordan111.jpg"],
                     "topic":["basketball"]};
    var item6 = new Item(6,metadata6);
    var metadata7 = {"author":["Michael Jordan"],
                     "type":["Audio clip"],
                     "title":["Coaching the Bobcats"],
                     "year":["2011"],
                     "description":["I should just play instead of this entire team, seriously."],
                     "img":["http://farm4.static.flickr.com/3342/4555131653_d2ec158101.jpg"],
                     "topic":["basketball"]};
    var item7 = new Item(7,metadata7);
    var metadata8 = {"author":["Michael Jordan"],
                     "type":["Manuscript"],
                     "title":["How I made baggy shorts popular"],
                     "year":["2011"],
                     "description":["I wore huge shorts so I could wear my UNC shorts under them. For every game of my NBA career. Seriously."],
                     "img":["http://static6.businessinsider.com/image/4d6d317ccadcbb193d020000-400-300/28-michael-jordan-would-always-wear-his-unc-shorts-under-his-nba-shorts.jpg"],
                     "topic":["basketball"]};
    var item8 = new Item(8,metadata8);
    var metadata9 = {"author":["Michael Jordan"],
                     "type":["Interview"],
                     "title":["I always wanted to be a baseball player."],
                     "year":["2001"],
                     "description":["My dad wanted that for me, too."],
                     "img":["http://i.cdn.turner.com/si/multimedia/photo_gallery/0904/nba.michael.jordan.playing.baseball/images/michael-jordan-barons-dugout.jpg"],
                     "topic":["basketball", "baseball"]};
    var item9 = new Item(9,metadata9);
    this.item_list = [item3, item4, item5, item6, item7, item8, item9, item1, item2];

    this.current = [["author","Michael Jordan"],["topic","Basketball"]];
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

    console.log(suggested);
    for (var k in suggested){
        var max = 0;
        for (var v in suggested[k]){
            if (suggested[k][v] > max)
                max = suggested[k][v];
        }
        if (max <= 1 || Object.keys(suggested[k]).length <= 1)
            delete suggested[k];
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
    alert("New Search! Facets:" + JSON.stringify(facets));
}
Model.prototype.edit = function(item){
    //takes an item object and sends an AJAX edit request
    //should return true on success, false on failure
}
