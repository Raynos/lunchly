var StreamRouter = require("stream-router")
    , StreamServerProxy = require("browser-stream-server")
    , Channel = require("multi-channel-mdm")

module.exports = StreamSetProxy

function StreamSetProxy(uri, multi) {
    var router = StreamRouter()

    if (multi) {
        router.addRoute(uri + "/:streamName/channel", Channel())
        router.addRoute(uri + "/:streamName/proxy/*"
            , StreamServerProxy(uri + "/:streamName/proxy"))
    } else {
        router.addRoute(uri + "/channel", Channel())
        router.addRoute(uri + "/proxy/*", StreamServerProxy(uri + "/proxy"))
    }

    return router
}