var Group = require('../entities').group
    , mdm = require("../lib/mdm")
    , StreamSet = require('../lib/streamSet')

module.exports = GroupListController

function GroupListController(groupListView, map){
    var groupList = StreamSet(mdm, "/groups")
        , groupSets= {}

    this.groupList = groupList

    groupList.on('set',function(group){
        var groupSet = groupSets[group.id] =
            StreamSet(mdm, "/group/" + group.id)

        groupListView.renderEntity(group)

        groupSet.on("set", function (value, key, group) {
            if (key === "location") {
                groupListView.unrenderEntity(group)
                groupListView.renderEntity(group)
            }
        })
    })

    groupList.on('delete',function(group){
        groupListView.unrenderEntity(group)
    })

    groupListView.on("mouseup", function (entity, event) {
        var x = event.layerX
            , y = event.layerY

        console.log("map", map)

        var latlng = map.fromContainerPixelToLatLng({
            x: x
            , y: y
        })

        console.log(latlng)
    })
}

GroupListController.prototype.newGroup = newGroup

function newGroup(name) {
    var group = Group(name)
    console.log("new group created", group)
    this.groupList.set(group.id, group)
}