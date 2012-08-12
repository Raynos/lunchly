var controllers = require('./controllers')
    , UserListController = controllers.userList
    , behaviours = require("./behaviours")
    , views = require("./views")
    , userList = behaviours.userList
    , UserListView = views.userList
    , UserNameView = views.username

// GLUE

var userListView = new UserListView()
    , userListController = new UserListController(userListView, userList)

UserNameView(userListController)
