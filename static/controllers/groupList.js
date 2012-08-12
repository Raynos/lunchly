var Group = require('../entities').group
    , mdm = require("../lib/mdm")
    , maps = require("../lib/maps")
    , LatLng = maps.LatLng
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

        groupSet.on("set", function (value, key) {
            if (key === "location") {
                var latlng = new LatLng(value.lat, value.lng)
                var point = map.fromLatLngToContainerPixel(latlng)
                group.coords = point
                groupListView.unrenderEntity(group)
                groupListView.renderEntity(group)
            }
        })
    })

    groupList.on('delete',function(group){
        groupListView.unrenderEntity(group)
    })

    groupListView.on("mouseup", function (group,  event) {
        //console.log("event", event)

        var x = event.target.x.baseVal.value
            , y = event.target.y.baseVal.value

        //console.log("x", x, "y", y, "event", event)

        var latlng = map.fromContainerPixelToLatLng({
            x: x
            , y: y
        })

        var lat = latlng.lat()
            , lng = latlng.lng()

        groupSets[group.id].set("location", {
            lat: lat
            , lng: lng
        })
    })
}

GroupListController.prototype.newGroup = newGroup

function newGroup(name) {
    var group = Group(name)
    console.log("new group created", group)
    this.groupList.set(group.id, group)
}