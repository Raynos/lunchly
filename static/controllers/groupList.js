var Group = require('../entities').group
    , mdm = require("../lib/mdm")
    , StreamSet = require('../lib/streamSet')

module.exports = GroupListController

function GroupListController(view){
    var groupList = StreamSet(mdm, "/groups")
    this.groupList = groupList
    groupList.on('set',function(group){
        view.renderEntity(group)
    })
    groupList.on('delete',function(group){
        view.unrenderEntity(group)
    })
}

GroupListController.prototype.newGroup = newGroup

function newGroup(name) {
    var group = Group(name)
    console.log("new group created", group)
    this.groupList.set(group.id, group)
}