function View(m){
    //This object draws stuff in HTML
    //View settings go here (i.e. how many things per row, etc)
	
	
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
    
    html+='<ul class="nav nav-tabs nav-stacked">';
    
	for (var index in current) {
    	html += '<li><a href="#">' + current[index][0] + ': ' + current[index][1] + '</a></li>';
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
    
    //parse array of results
    var html = "";
    
    
    for (var i = 0; i<item_list.length; i++) {
    	html += JSON.stringify(item_list[i]) + "<br><br><br>";
    }
    
    $('#results').html(html);
}
View.prototype.draw_list = function(item_list){
    //uses return of m.get_items()
}
