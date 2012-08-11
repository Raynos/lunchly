var raphael = require('../lib/raphael')

module.exports = PaperListController

function PaperListController(){
    this.x = 0
    this.y = 0
    this.width = 500
    this.height = 500
    this.paper = raphael.Raphael(
        this.x
        , this.y
        , this.width
        , this.height
    )
}