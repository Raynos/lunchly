var controllers = require('./controllers/')
    , PaperController = controllers.paperController
    , UserListController = controllers.userList
    , behaviours = require("./behaviours/")
    , userList = behaviours.userList
    , entities = require("./entities")
    , uuid = require("node-uuid")
    , User = entities.user

var paperController = new PaperController()

var userListController = new UserListController(
    paperController.paper
    , userList
)

userListController.addUser(User(uuid()))

console.log("entry!",paperController)