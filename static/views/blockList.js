var moveSet = require('./moveSet')
    , EventEmitter = require('events').EventEmitter
    , util = require('util')
    , paper = require("./paper")
    , rect_entity = {}

module.exports = BlockListView

function BlockListView(options) {
    options = options || {}
    this.entity_set = {}
    this.renderedBlocks = 0
    this.blockWidth = options.blockWidth || 100
    this.blockHeight = options.blockHeight || 100
    this.padding = options.padding || 100
    this.cornering = options.cornering || 10
    this.originX = options.originX || 0
    this.originY = options.originY || 0
    this.color = options.color || ""
}
util.inherits(BlockListView,EventEmitter)

BlockListView.prototype.getNewCoordinates = getNewCoordinates
BlockListView.prototype.renderEntity = renderEntity
BlockListView.prototype.unrenderEntity = unrenderEntity
BlockListView.prototype.getEntityByElementId = getEntityByElementId

function getEntityByElementId(elementId){
    return rect_entity[elementId]
}

function getBlockByElementId(elementId){
    return rect_entity[elementId]
}

function renderEntity(entity) {
    var self = this
        , coordinates = this.getNewCoordinates(entity)
    if(!entity.id){
        console.warn("renderBlock, entity has no id.  not rendering")
        return
    }
    var rect = paper.rect(
        coordinates.x
        , coordinates.y
        , this.blockWidth
        , this.blockHeight
        , this.cornering
    )
    var text = paper.text(
        coordinates.x + this.blockWidth / 2
        , coordinates.y + this.blockHeight / 2
        , entity.name || "??"
    )
    var set = paper.set(rect, text)
    this.entity_set[entity.id] = set
    moveSet(set)
    rect.attr("fill", this.color)
    rect_entity[rect.id] = entity
    set.mouseup(onmouseup)
    rect.onDragOver(function(element){
        console.log(rect.id + "is over "+element.id)
        self.emit('onDragOver',entity,element)
    })

    function onmouseup(event) {
        self.emit("mouseup", entity, event)
    }
}

function getNewCoordinates(entity){
    if (entity.coords) {
        return entity.coords
    }

    var numBlocks = this.renderedBlocks
        , x = (this.originX + numBlocks *
            this.blockWidth + this.padding)
        , y = this.originY

    this.renderedBlocks++

    return {x:x,y:y}
}

function unrenderEntity(entity) {
    this.entity_set[entity.id].remove()
}