var Group = require('../entities').group
    , mdm = require("../lib/mdm")
    , StreamSet = require('../lib/streamSet')

module.exports = GroupListController

function GroupListController(groupListView, map){
    var groupList = StreamSet(mdm, "/groups")
    this.groupList = groupList
    groupList.on('set',function(group){
        groupListView.renderEntity(group)
    })
    groupList.on('delete',function(group){
        groupListView.unrenderEntity(group)
    })
}

GroupListController.prototype.newGroup = newGroup

function newGroup(name) {
    var group = Group(name)
    console.log("new group created", group)
    this.groupList.set(group.id, group)
}