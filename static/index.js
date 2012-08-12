var controllers = require('./controllers')
    , UserListController = controllers.userList
    , GroupListController = controllers.groupList
    , views = require("./views")
    , UserListView = views.userList
    , UserNameView = views.username
    , GroupListView = views.groupList
    , BlockListView = views.blockList
    , NewGroup = views.newGroup
    , Map = views.map

navigator.geolocation.getCurrentPosition(function (position) {
    var map = Map(position)

    // GLUE
    var groupListView = new BlockListView({
            blockWidth : 400
            , blockHeight : 100
            , padding :10
            , cornering :10
            , originY: 300
            , color: "#fff"
        })
        , groupListController = new GroupListController(groupListView)

    var userListView = new BlockListView({
            blockWidth : 75
            , blockHeight : 75
            , padding :10
            , cornering :10
            , color: "#f00"
        })
        , userListController = new UserListController(userListView
            , groupListView)

    UserNameView(userListController)
    NewGroup(groupListController)
})