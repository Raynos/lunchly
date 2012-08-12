var raphael = require('../lib/raphael')
    , x = 1
    , y = 100
    , paperElement = document.getElementById("rapheal-paper")
    , width = paperElement.offsetWidth - 4
    , height = paperElement.offsetHeight - 4

module.exports = raphael(paperElement, "100%", "100%")