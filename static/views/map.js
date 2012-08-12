var maps = require("../lib/maps")
    , LatLng = maps.LatLng
    , Map = maps.Map
    , Marker = maps.Marker

var mapCanvas = document.getElementById("map-canvas")

navigator.geolocation.getCurrentPosition(function (position) {
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
})