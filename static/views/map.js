var maps = require("../lib/maps")
    , LatLng = maps.LatLng
    , Map = maps.Map
    , Marker = maps.Marker

var mapCanvas = document.getElementById("map-canvas")

module.exports = createMap

function createMap(position) {
    var latlng = new LatLng(
            position.coords.latitude
            , position.coords.longitude
        )
        , map = new Map(mapCanvas, {
            center: latlng,
            zoom: 15,
            mapTypeId: maps.MapTypeId.ROADMAP
        })
        , marker = new Marker({
            position: latlng
            , map: map
            , title:"You are here! (at least within a " +
                position.coords.accuracy+" meter radius)"
        })
        , overlay = Overlay(map)

    map.fromContainerPixelToLatLng = fromContainerPixelToLatLng
    map.fromLatLngToContainerPixel = fromLatLngToContainerPixel

    return map

    function fromLatLngToContainerPixel(latlng) {
        return overlay.getProjection().fromLatLngToContainerPixel(latlng)
    }

    function fromContainerPixelToLatLng(pixel) {
        return overlay.getProjection().fromContainerPixelToLatLng(pixel)
    }
}

function Overlay(map) {
    var overlay = new maps.OverlayView()
    overlay.draw = function() {}
    overlay.setMap(map)
    return overlay
}