var Group = require('../entities').group

module.exports = GroupListController

function GroupListController(view, groupList){
    this.groupList = groupList
    groupList.on('set',function(group){
        view.renderGroup(group)
    })
    groupList.on('delete',function(group){
        view.unrenderGroup(group)
    })
}

GroupListController.prototype.newGroup = newGroup

function newGroup(name) {
    var group = Group(name)
    this.groupList.set(group.id, group)
}