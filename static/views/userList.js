var userWidth = 50
    , userHeight = 50
    , padding = 10
    , cornering = 10
    , paper = require("./paper")
    , moveRectangle = require('./moveRectangle')
    , EventEmitter = require('events').EventEmitter
    , util = require('util')
    , rect_user = {}

module.exports = UserListView

function UserListView() {
    this.objects = {}
    this.renderedUsers = 0
}
util.inherits(UserListView,EventEmitter)


UserListView.prototype.getNewCoordinates = getNewCoordinates
UserListView.prototype.renderUser = renderUser
UserListView.prototype.unrenderUser = unrenderUser

function renderUser(user) {
    var coordinates = this.getNewCoordinates()
    , self = this

    console.log(coordinates,this.users)
    var rect = paper.rect(
        coordinates.x
        , coordinates.y
        , userWidth
        , userHeight
        , cornering
    )
    console.log("rendering", user)
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
        console.log(rect.id + "is over "+element.id)
        self.emit('userOnElement',user,element.id)
    })
}

function getNewCoordinates(user){
    var numUsers = this.renderedUsers
        , x = (numUsers * userWidth + padding)
        , y = 0

    this.renderedUsers++

    return {x:x,y:y}
}

function unrenderUser(user) {
    this.objects[user.id].remove()
}