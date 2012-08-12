var raphael = require('../lib/raphael')

module.exports = PaperController

function PaperController(){
    this.x = 1
    this.y = 100
    this.width = 500
    this.height = 500
    this.paper = raphael(
        this.x
        , this.y
        , this.width
        , this.height
    )
}