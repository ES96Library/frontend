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
    
    for (var i = 0; i<item_list.length; i++) {
    	
    	//check for an image associated with the item, else add the placeholder image
    	if(item_list[i].metadata['img']) {
    		img = item_list[i].metadata['img']}    		
    	else {
    		img = this.default_image;
    		};
    	
    	//check for a thumbnail associated with the item, else add the placeholder image
    	if(item_list[i].metadata['img']) {
    		img = item_list[i].metadata['img']}    		
    	else {
    		img = this.default_image;
    		};
    		
    	html += '<div data-toggle="modal" href="#myModal'+i+'" >'
    	html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="' + img + '" alt=""><h6>'+item_list[i].metadata['author']+'</h6>'+item_list[i].metadata['title']+'</div></li></div>'

    	
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
    	
    	//html += '<h5>Author</h5><p>'+item_list[i].metadata['author']+'</p>'
    	//html += '<h5>Year</h5><p>'+item_list[i].metadata['year']+'</p>'
    	//html += '<h5>Format</h5><p>'+item_list[i].metadata['type']+'</p>'
    	//html += '<h5>Desription</h5><p>'+item_list[i].metadata['description']+'</p>'
    	html += '</div>'
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
