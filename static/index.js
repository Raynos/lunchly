var controllers = require('./controllers/')
    , behaviours = require("./behaviours/")

var paperController = new controllers.paperController()

var userListController = new controllers.userList(
    paperController.paper
    , behaviours.userList
)

userListController.addUser({
    a: 1
    , id: 1
})
userListController.addUser({
    b: 2
    , id: 2
})
userListController.addUser({
    c: 3
    , id: 3
})

console.log("entry!",paperController)
