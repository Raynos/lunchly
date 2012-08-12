var StreamRouter = require("stream-router")
    , StreamServerProxy = require("browser-stream-server")
    , Channel = require("multi-channel-mdm")
    , StreamStore = require("stream-store")

module.exports = StreamSetProxy

function StreamSetProxy(uri, multi) {
    var router = StreamRouter()
        , streamStore = StreamStore()

    router.streamStore = streamStore

    if (multi) {
        router.addRoute(uri + "/:streamName/channel", Channel(streamStore))
        router.addRoute(uri + "/:streamName/proxy/*"
            , StreamServerProxy(uri + "/:streamName/proxy"))
    } else {
        router.addRoute(uri + "/channel", Channel(streamStore))
        router.addRoute(uri + "/proxy/*", StreamServerProxy(uri + "/proxy"))
    }

    return router
}