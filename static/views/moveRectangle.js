module.exports = [move,start,up]

function start() {
    this.toFront()
    this.ox = this.attr("x")
    this.oy = this.attr("y")
    this.animate({
        opacity: 0.75
    }, 100, ">")
}

function move(dx, dy) {
    this.attr({
        x: this.ox + dx,
        y: this.oy + dy
    })
}

function up() {
    this.animate({
        opacity: 1.0
    }, 500, ">")
}