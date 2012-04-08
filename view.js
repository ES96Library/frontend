function View(m){
    //This object draws stuff in HTML
    //View settings go here (i.e. how many things per row, etc)
	this.gridcolumns = 3;//determines size of thumbnails, also determining number of thumbnails displayed per row
	this.default_image = 'http://placehold.it/260x180'//define the default placeholder image
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
    	html += '<div class="alert alert-info"><a class="close">x</a><strong>' + current[index][0] + ':</strong> ' + current[index][1] + '</div>';
    }
    	
    	html+='</ul><ul class="nav nav-list">';
    	
    for (var k in suggested) {
    	html += '<li class="nav-header">' + k + '</li>';
    	
    	for(var v in suggested[k]) {
    	html += '<li><a href="#">' + v + ' (' + suggested[k][v] + ')</a></li>';
    	}
    }
    html += '</ul>';
    
    $('#facets').html(html);
}
View.prototype.draw_grid = function(item_list){
    //uses return of m.get_items()
    
    var html = '<ul class="thumbnails">';
    var metadata = '';
    
    //var html = '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="http://placehold.it/260x180" alt=""><h5>Thumbnail label</h5><p>Thumbnail caption right here...</p></div></li>';
	//html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="http://placehold.it/260x180" alt=""><h5>Thumbnail label</h5><p>Thumbnail caption right here...</p></div></li>';
	//html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="http://placehold.it/260x180" alt=""><h5>Thumbnail label</h5><p>Thumbnail caption right here...</p></div></li>';
   	//html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="http://placehold.it/260x180" alt=""><h5>Thumbnail label</h5><p>Thumbnail caption right here...</p></div></li>';
   
    
    for (var i = 0; i<item_list.length; i++) {
    	
    	//check for an image associated with the item, else add the placeholder image
    	if(item_list[i].metadata['img']) {
    		img = item_list[i].metadata['img']}    		
    	else {
    		img = this.default_image;
    		};
    		
    	html += '<div data-toggle="modal" href="#myModal'+i+'" >'
    	html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="' + img + '" alt=""></div>'+item_list[i].metadata['author']+'-'+item_list[i].metadata['title']+'</li></div>'

    	
    	html+= '<div class="modal hide" id="myModal'+i+'">'
    	html += '<div class="modal-header">'
    	html += '<a class="close" data-dismiss="modal">×</a>'
    	html += '<h3>'+item_list[i].metadata['title'] +'</h3></div>'
    	html += '<div class="modal-body">'
    	html += '<p>'+item_list[i].metadata['author']+'</p></div>'
    	html += '<div class="modal-footer">'
    	html += '<a href="#" class="btn">Close</a>'
    	html += '<a href="#" class="btn btn-primary">Save changes</a></div></div>'
	
    }
    html += '</ul>'
    $('#results').html(html);
}
View.prototype.draw_list = function(item_list){
    //uses return of m.get_items()
}
