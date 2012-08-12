var User = require("../entities").user
    , StreamSet = require('../lib/streamSet')
    , mdm = require('../lib/mdm')
    , UserSet = require("../lib/userSet")

module.exports = UserListController

function UserListController(userListView, groupListView){
    var userSets = {}
    var userList = this.userList = UserSet(mdm, "/users")
    

    userList.on("set", function (user) {
        // console.log("got user", user)
        var userSet = userSets[user.id] = StreamSet(mdm,'/user/'+user.id)
        userListView.renderEntity(user)
        userSet.on("set",function(value,key){
            //console.log("userSet",user.id,value,key)
        })
    })

    userList.on("delete", function (user) {
        console.log("got delete for user", user)
        userListView.unrenderEntity(user)
    })

    userListView.on('onDragOver', function(entity,element){
        var group = groupListView.getEntityByElementId(element.id)
        if(group){
            userSets[entity.id].set("group",group)
        }
    })
}

UserListController.prototype.identify = identify

function identify(username) {
    var user = User(username)
    console.log("identify user", user)
    this.userList.identify(user)
}