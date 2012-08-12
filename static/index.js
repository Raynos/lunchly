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
    , BlockListView = views.blockList
    , NewGroup = views.newGroup

// GLUE
var groupListView = new BlockListView({
        blockWidth : 400
        , blockHeight : 100
        , padding :10
        , cornering :10
    })
    , groupListController = new GroupListController(groupListView, groupList)

var userListView = new BlockListView({
        blockWidth : 100
        , blockHeight : 100
        , padding :10
        , cornering :10
    })
    , userListController = new UserListController(
        userListView, userList,groupListView)

UserNameView(userListController)
NewGroup(groupListController)