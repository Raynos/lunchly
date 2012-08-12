var groupWidth = 400
    , groupHeight = 100
    , padding = 10
    , cornering = 10
    , paper = require("./paper")
    , moveRectangle = require('./moveRectangle')
    , rect_group = {}

module.exports = GroupListView

function GroupListView() {
    this.objects = {}
    this.renderedGroups = 0
}

GroupListView.prototype.getNewCoordinates = getNewCoordinates
GroupListView.prototype.renderGroup = renderGroup
GroupListView.prototype.unrenderGroup = unrenderGroup
GroupListView.prototype.getGroupByElementId = getGroupByElementId

function getGroupByElementId(elementId){
    return rect_group[elementId]
}

function renderGroup(group) {
    var coordinates = this.getNewCoordinates()

    console.log(coordinates,this.groups)
    var rect = paper.rect(
        coordinates.x
        , coordinates.y
        , groupWidth
        , groupHeight
        , cornering
    )
    console.log("rendering", group)
    var text = paper.text(
        coordinates.x + groupWidth / 2
        , coordinates.y + groupHeight / 2
        , group.name
    )
    this.objects[group.id] = paper.set(rect, text)
    rect.attr("fill", "#f00")
    rect.drag.apply(rect,moveRectangle)
    rect_group[rect.id] = group
    rect.onDragOver(function(element){
        console.log(rect.id + "is over "+element.id)
    })
}

function getNewCoordinates(group){
    var numGroups = this.renderedGroups
        , x = (numGroups * groupWidth + padding)
        , y = 0

    this.renderedGroups++

    return {x:x,y:y}
}

function unrenderGroup(group) {
    this.objects[group.id].remove()
}