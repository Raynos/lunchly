var User = require("../entities").user

module.exports = UserListController

function UserListController(view, userList){
    this.userList = userList

    userList.on("set", function (user) {
        console.log("got user", user)
        view.renderUser(user)
    })

    userList.on("delete", function (user) {
        view.unrenderUser(user)
    })
}

UserListController.prototype.identify = identify

function identify(username) {
    var user = User(username)
    console.log("identify user", user)
    this.userList.identify(user)
}