var User = require("../entities").user
    , StreamSet = require('../lib/streamSet')
    , mdm = require('../lib/mdm')

module.exports = UserListController

function UserListController(view, userList,groupListView){
    var userSets = {}
    this.userList = userList
    

    userList.on("set", function (user) {
        // console.log("got user", user)
        var userSet = userSets[user.id] = StreamSet(mdm,'/user/'+user.id)
        view.renderEntity(user)
        userSet.on("set",function(value,key){
            console.log("userSet",user.id,value,key)
        })
    })

    userList.on("delete", function (user) {
        view.unrenderUser(user)
    })

    view.on('userOnElement',function(user,elementId){
        var group = groupListView.getGroupByElementId(elementId)
        if(group){
            userSets[user.id].set("group",group)
        }
    })
}

UserListController.prototype.identify = identify

function identify(username) {
    var user = User(username)
    console.log("identify user", user)
    this.userList.identify(user)
}