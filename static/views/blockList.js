var moveSet = require('./moveSet')
    , EventEmitter = require('events').EventEmitter
    , iterators = require("iterators")
    , some = iterators.someSync
    , util = require('util')
    , paper = require("./paper")

module.exports = BlockListView

function BlockListView(options) {
    options = options || {}
    this.entity_set = {}
    this.entities = {}
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
BlockListView.prototype.createSet = createSet

function getEntityByElementId(elementId){
    return some(this.entity_set, function (set, entityId) {
        return some(set, function (elem) {
            return elem.id === elementId
        }) && this.entities[entityId]
    }, this)
    //return block_entity[elementId]
}

function renderEntity(entity) {
    var self = this
        , coordinates = this.getNewCoordinates(entity)
    if(!entity.id){
        console.warn("renderBlock, entity has no id.  not rendering")
        return
    }
    var set = this.createSet(coordinates, entity)
    this.entity_set[entity.id] = set
    this.entities[entity.id] = entity
    moveSet(set)
    set.mouseup(onmouseup)

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

function createSet(coordinates, entity) {
    var self = this

    var rect = paper.rect(
        coordinates.x
        , coordinates.y
        , this.blockWidth
        , this.blockHeight
        , this.cornering
    )
    rect.attr("fill", this.color)
    var text = paper.text(
        coordinates.x + this.blockWidth / 2
        , coordinates.y + this.blockHeight / 2
        , entity.name || "??"
    )
    rect.onDragOver(function(element){
        console.log(rect.id + "is over "+element.id)
        self.emit('onDragOver',entity,element)
    })

    return paper.set(rect, text)
}