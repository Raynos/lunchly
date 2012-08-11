var controllers = require('./controllers/')

var paperController = new controllers.paperController()

var userListController = new controllers.userList(paperController.paper)

userListController.addUser({a:1})
userListController.addUser({b:2})
userListController.addUser({c:3})

console.log("entry!",paperController)