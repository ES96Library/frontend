function View(m){
    //This object draws stuff in HTML
    //View settings go here (i.e. how many things per row, etc)
    this.gridcolumns = 3;//determines size of thumbnails, also determining number of thumbnails displayed per row
    this.gridheight = 400;//determine the height of each row of the grid view
    this.default_image = 'http://freepages.genealogy.rootsweb.com/~jganis/CabarrusCo/Odell.jpg' //define the default placeholder image
        //'http://www.tullglazener.com/Old%20Rugged%20Cross/Old%20Rugged%20Cross%20-%20harmony.jpg'
}
View.prototype.clear_filters = function(){
    //put loading graphic in filters pane
}
View.prototype.clear_results = function(){
    //put loading graphic in results pane
}
View.prototype.draw_filters = function(filters){
    //uses return of m.get_filters()

    var html = ''
        var current = filters.current;
    var suggested = filters.suggested;


    for (var index in current) {
        html += '<div class="alert alert-info"><a class="close" facet="' + index + '">x</a><strong>' + current[index][0] + ':</strong> ' + current[index][1] + '</div>';
    }

    html+='</ul><ul class="nav nav-list">';

    for (var k in suggested) {
        html += '<li class="nav-header">' + k + '</li>';

        for(var v in suggested[k]) {
            html += '<li><a href="#" facetkey="'+k+'" facetval="'+v+'">' + v + ' (' + suggested[k][v] + ')</a></li>';
        }
    }
    html += '</ul>';

    if (Object.keys(suggested).length == 0)
        html += 'These items have no more properties to filter on.';

    $('#facets').html(html);
}
View.prototype.draw_grid = function(item_list){
    //uses return of m.get_items()

    var html = '<ul class="thumbnails"><div class="gridrow" style="height:'+this.gridheight+'px">';
    var metadata = '';
    var counter = 0;

    for (var i = 0; i<item_list.length; i++) {
        //check for an image associated with the item, else add the placeholder image
        if(item_list[i].thumb) {
            img = item_list[i].thumb}    		
        else {
            img = this.default_image;
        };
    	
		//items per row = available size divided by gridcolumns
		//put each row in a grid to keep heights consistant
		//start a new row only when the previous row is full
		if(counter >= this.gridcolumns){
			//close the previous row's div and reset the counter
			html += '</div>';
			counter = 0;
			//open a new row div
			html += '<div class="gridrow" style="height:'+this.gridheight+'px">';
		}

		

       		//display the thumbnails
       		html += '<div data-toggle="modal" item="'+i+'" >';
      		html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="' + img + '" alt=""><h6>'+item_list[i].metadata['Author']+'</h6>'+item_list[i].metadata['Title']+'</div></li></div>';
        	
        	//increment variable counting thumbnails per row
        	counter++;





            /*	
                html+= '<div class="modal hide fade" id="myModal'+i+'" style="width:700px;margin-left=-350px">'
                html += '<div class="modal-header">'
                html += '<a class="close" data-dismiss="modal">×</a>'

            //begin modal content
            html += '<img src="' + img + '"id=myimg'+i+' style="max-width:800px;max-height:400px;"></img></div>'
            html += '<div class="modal-body">'

            // loop through metadata, adding all available information
            for (var index in item_list[i].metadata){
            html += '<h5>'+ index +'</h5><p>'+item_list[i].metadata[index]+'</p>'
            }

            html += '</div>'
            html += '<div class="modal-footer">'
            html += '<a href="#" class="btn">Close</a>'
            html += '<a href="#" class="btn btn-primary">Save changes</a></div></div>'
            */

    }
    //close the last row div and the unordered list of the thumbnails
    html += '</div></ul>'
        $('#results').html(html);
	document.getElementById('loading').style.display = 'none';
}
View.prototype.draw_list = function(item_list){
    //uses return of m.get_items()
}
