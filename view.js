function View(m){
    //This object draws stuff in HTML
    //View settings go here (i.e. how many things per row, etc)
}
View.prototype.clear_filters(){
    //put loading graphic in filters pane
}
View.prototype.clear_results(){
    //put loading graphic in results pane
}
View.prototype.draw_filters(filters){
    //uses return of m.get_filters()
}
View.prototype.draw_grid(item_list){
    //uses return of m.get_items()
}
View.prototype.draw_list(item_list){
    //uses return of m.get_items()
}
