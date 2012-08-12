var controllers = require('./controllers')
    , UserListController = controllers.userList
    , GroupListController = controllers.groupList
    , behaviours = require("./behaviours")
    , views = require("./views")
    , userList = behaviours.userList
    , groupList = behaviours.groupList
    , UserListView = views.userList
    , UserNameView = views.username
    , GroupListView = views.groupList
    , NewGroup = views.newGroup

// GLUE
var groupListView = new GroupListView()
    , groupListController = new GroupListController(groupListView, groupList)

var userListView = new UserListView()
    , userListController = new UserListController(userListView, userList)

UserNameView(userListController)
NewGroup(groupListController)