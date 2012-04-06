function View(m){
    //This object draws stuff in HTML
    //View settings go here (i.e. how many things per row, etc)
	this.gridcolumns = 3;//determines number of thumbnail results displayed per row
	
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
    	
    for (var index in suggested) {
    	html += '<li class="nav-header">' + index + '</li>';
    	
    	for(var n in suggested[index]) {
    	html += '<li><a href="#">' + suggested[index][n] + '</a></li>';
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
    	html += '<li class="span'+ this.gridcolumns + '"><div class="thumbnail"><img src="http://placehold.it/260x180" alt=""><h5>'
    	html += item_list[i].metadata['title'] + '</h5><p>'
    	html += item_list[i].metadata['author'] + '</p></div></li>';
	
    }
    html += '</ul>'
    $('#results').html(html);
}
View.prototype.draw_list = function(item_list){
    //uses return of m.get_items()
}
