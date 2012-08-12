module.exports = function(set){
    
    function start() {
        
        this.animate({opacity: 0.25}, 100, ">")
        for(i=0;i<set.length;i++){
            var element = set[i]
            element.toFront()
            element.ox = element.attr("x")
            element.oy = element.attr("y")
        }
    }

    function move(dx, dy) {
        this.attr({x: this.ox + dx, y: this.oy + dy})
        for(i=0;i<set.length;i++){
            var element = set[i]
            if(element.id!==this.id){
                element.attr({x: element.ox + dx, y: element.oy + dy});
            }
        }
    }

    function up () {
        this.animate({opacity: 1}, 100, ">")
    }
    set.drag(move,start,up)
}