var raphael = require('../lib/raphael')
    , userWidth = 50
    , userHeight = 50
    , padding = 10
    , cornering = 10
    , moveRectangle = require('../behaviours/moveRectangle')

module.exports = UserListController

var rect_user = {}

function UserListController(paper, userList){
    var self = this
    this.paper = paper
    this.objects = {}
    this.userList = userList
    this.renderedUsers = 0

    userList.on("set", function (user) {
        console.log("got user", user)
        self.renderUser(user)
    })

    userList.on("delete", function (user) {
        self.objects[user.id].remove()
    })
}

UserListController.prototype.getNewCoordinates = getNewCoordinates
UserListController.prototype.renderUser = renderUser

function renderUser(user) {
    var coordinates = this.getNewCoordinates()
        , paper = this.paper

    console.log(coordinates,this.users)
    var rect = paper.rect(
        coordinates.x
        , coordinates.y
        , userWidth
        , userHeight
        , cornering
    )
    var text = paper.text(
        coordinates.x + userWidth / 2
        , coordinates.y + userHeight / 2
        , user.name
    )
    this.objects[user.id] = paper.set(rect, text)
    rect.attr("fill", "#f00")
    rect.drag.apply(rect,moveRectangle)
    rect_user[rect.id] = user
    rect.onDragOver(function(element){
        console.log(user.name, "on top of "
            ,rect_user[element.id].name)
    })
    
}

function getNewCoordinates(user){
    var numUsers = this.renderedUsers
        , x = (numUsers * userWidth + padding)
        , y = 0

    this.renderedUsers++

    return {x:x,y:y}
}
