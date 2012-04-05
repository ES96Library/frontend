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
}
View.prototype.draw_grid = function(item_list){
    //uses return of m.get_items()
}
View.prototype.draw_list = function(item_list){
    //uses return of m.get_items()
}
