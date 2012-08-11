var raphael = require('../lib/raphael')
    , userWidth = 50
    , userHeight = 50
    , padding = 10
    , cornering = 10

module.exports = UserListController

function UserListController(paper,users){
    this.paper = paper
    this.users = users || []
}
UserListController.prototype.addUser = addUser
UserListController.prototype.getNewCoordinates = getNewCoordinates

function addUser(user){
    
    var coordinates = this.getNewCoordinates()
    console.log(coordinates,this.users)
    user.rect = this.paper.rect(
        coordinates.x
        , coordinates.y
        , userWidth
        , userHeight
        , cornering
    )
    user.rect.attr("fill", "#f00")
    this.users.push(user)
}

function getNewCoordinates(){
    var numUsers = this.users.length
        , x = (numUsers * userWidth + padding)
        , y = 0
    return {x:x,y:y}
}