var raphael = require('../lib/raphael')
    , userWidth = 50
    , userHeight = 50
    , padding = 10
    , cornering = 10
    , moveRectangle = require('../behaviours/moveRectangle')

module.exports = UserListController

function UserListController(paper, userList){
    var self = this
    this.paper = paper
    this.userList = userList
    this.renderedUsers = 0

    userList.on("set", function (user) {
        console.log("got user", user)
        self.renderUser(user)
    })
}
UserListController.prototype.addUser = addUser
UserListController.prototype.getNewCoordinates = getNewCoordinates
UserListController.prototype.renderUser = renderUser

function addUser(user){
    this.userList.set(user.id, user)
    //this.renderUser(user)
}

function renderUser(user) {
    var coordinates = this.getNewCoordinates()
    console.log(coordinates,this.users)
    var rect = this.paper.rect(
        coordinates.x
        , coordinates.y
        , userWidth
        , userHeight
        , cornering
    )
    rect.attr("fill", "#f00")
    rect.drag.apply(rect,moveRectangle)
}

function getNewCoordinates(user){
    var numUsers = this.renderedUsers
        , x = (numUsers * userWidth + padding)
        , y = 0

    this.renderedUsers++

    return {x:x,y:y}
}
