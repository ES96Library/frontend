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
        
        //only display the first 5 suggestions for each facet
		counter = 0;
        for(var v in suggested[k]) {
        	if(counter<=4) {
            html += '<li><a facetkey="'+k+'" facetval="'+v+'">' + v + ' (' + suggested[k][v] + ')</a></li>';
        	counter++;
        	}
        }
    }
    html += '</ul>';

    if (Object.keys(suggested).length == 0)
        html += 'These items have no more properties to filter on.';

    $('#facets').html(html);
}
View.prototype.draw_grid = function(item_list){
    //uses return of m.get_items()

    var selected = $('.selected_thumbnail').closest('[item]');
    var iids = []
    var fields = {};
    for (var i=0;i<selected.length;i++){
        iids.push($(selected[i]).attr('iid'));
    }

    var html = '<ul class="thumbnails"><div class="gridrow">';
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
			html += '<div class="gridrow">';
		}

		

       		//display the thumbnails
       		html += '<div data-toggle="modal" item="'+i+'" iid="'+item_list[i].id+'" >';
      		html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="' + img + '" alt="">';
      		
      		//if the item has an author, display the author
      		if(item_list[i].metadata['Author']){
      			html += '<h6>'+item_list[i].metadata['Author'] + '</h6>';
      			
      			//if the item also has a title, display that
      			if(item_list[i].metadata['Title']){
    				html += item_list[i].metadata['Title'];
    			}
    			else {
    				//if no title is available, say 'no title'
    				html += '<p>No Title</p>';
    			}
      		}
      		else {
    			//if no author is available, say 'no author'
    			html += '<h6>No Author</h6>';
				//if a title is available, display that
      			if(item_list[i].metadata['Title']){
    				html += item_list[i].metadata['Title'];
    			}
    			else {
    				//if no title is available, say 'no title'
    				html += '<p>No Title</p>';
    			}
    			
    			
    					/*
      			//This code substitutes the author for a publisher, if available,
      			// but looks too long for a thumbnail
      			
      			if(item_list[i].metadata['Publisher']) {
      			  	html += '<h6>'+item_list[i].metadata['Publisher'] + '</h6>';
      				if(item_list[i].metadata['Title']){
    					html += '<p>' + item_list[i].metadata['Title'] + '</p>';
    				}
    				else {
    					html += '<h6>No Author</h6>';
    					if(item_list[i].metadata['Title']){
    						html += '<p>' + item_list[i].metadata['Title'] + '</p>';
    					}
    					else {
    						html += '<p>No Title</p>'
    					}
    			*/
    			
    			
    			
      			
      		}

      		html += '</div></li></div>';
        	
        	/* 
        	//display the thumbnails
       		html += '<div data-toggle="modal" item="'+i+'" iid="'+item_list[i].id+'" >';
      		html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="' + img + '" alt="">';
      		
      		if(item_list[i].metadata['Author']) {
      			html += '<h6>' + item_list[i].metadata['Author']+'</h6>';
      			html += item_list[i].metadata['Title'];
      			//console.log(item_list[i].metadata['Author']);
      		}
      		else {
      			if(item_list[i].metadata['Publisher']) {
      				html =+ '<h6>' + item_list[i].metadata['Publisher']+'</h6>';
      				html += item_list[i].metadata['Title'];
      				//console.log(item_list[i].metadata['Publisher']);
				}
				else {
      				//console.log('3');					
					html += '<h6>' + item_list[i].metadata['Title'] + '</h6>';
				}
			}
			//console.log(item_list[i].metadata['Title'])
			//html += '<h6>' + item_list[i].metadata['Title'] + '</h6>'
      		html += '</div></li></div>';
        
        	*/
        	//increment variable counting thumbnails per row
        	counter++;


    }
    //close the last row div and the unordered list of the thumbnails
    html += '</div></ul>';
    if (item_list.length >= 50)
        html += '<button id="morebutton" class="btn btn-large span9">See more</button>';
    if (item_list.length == 0)
        html = '<div style="text-align:center;">No matching items!</div>';
    $('#results').html(html);
	document.getElementById('loading').style.display = 'none';


    //reapply selected class
    for (i in iids){
        $('[iid="'+iids[i]+'"]').find('.thumbnail').addClass('selected_thumbnail');
    }
}
View.prototype.draw_list = function(item_list){
    //uses return of m.get_items()
}
