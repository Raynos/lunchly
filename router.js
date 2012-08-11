var boot = require("boot")
    , StreamRouter = require("stream-router")
    , StreamSetProxy = require("./lib/streamSet")

var streamRouter = StreamRouter()
    , sock = boot(logger(streamRouter))

// A set for each user
streamRouter.addRoute("/user", StreamSetProxy("/user", true))
// A set for all users
streamRouter.addRoute("/users", StreamSetProxy("/users"))

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