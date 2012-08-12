var start = function() {
        this.ox = this.attr("x")
        this.oy = this.attr("y")
        this.animate({
            opacity: 0.75
        }, 100, ">")
    }
    , move = function(dx, dy) {
        this.attr({
            x: this.ox + dx,
            y: this.oy + dy
        })
    }
    , up = function() {
        this.animate({
            opacity: 1.0
        }, 500, ">")
    }

module.exports = [move,start,up]
