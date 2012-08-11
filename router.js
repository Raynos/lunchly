var boot = require("boot")
    , StreamRouter = require("stream-router")
    , Channel = require("multi-channel-mdm")
    , StreamServerProxy = require("browser-stream-server")

var streamRouter = StreamRouter()
    , sock = boot(logger(streamRouter))

// A channel for each user
streamRouter.addRoute("/user/:streamName", Channel())
// A channel for all users
streamRouter.addRoute("/users", Channel())
// A Stream server for all users
streamRouter.addRoute("/users/*", StreamServerProxy("/users"))

module.exports = router

function router(server) {
    sock.install(server, "/boot")
}

function logger(f) {
    return function (stream) {
        /*console.log("[BOOT-STREAM-RECEIVED]", {
            meta: stream.meta
            , id: stream.id
        })
        stream.on("data", function (data) {
            console.log("[BOOT-STREAM-DATA]", {
                meta: stream.meta
                , data: data
                , id: stream.id
            })
        })*/
        f.apply(this, arguments)
    }
}