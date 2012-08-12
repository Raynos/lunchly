var boot = require("boot")
    , StreamRouter = require("stream-router")
    , StreamSetProxy = require("./lib/streamSet")
    , UserSetProxy = require("./lib/userSet")

var streamRouter = StreamRouter()
    , sock = boot(logger(streamRouter))

// A set for each user
streamRouter.addRoute("/user/*", StreamSetProxy("/user", true))
// A set for all users
streamRouter.addRoute("/users/*", UserSetProxy("/users"))
// A set for each group
streamRouter.addRoute("/group/*", StreamSetProxy("/group", true))
// A set for all groups
streamRouter.addRoute("/groups/*", StreamSetProxy("/groups"))

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
        })
        var _write = stream.write
        stream.write = function (data) {
            console.log("[BOOT-STREAM-WRITE]", {
                meta: stream.meta
                , data: data
                , id: stream.id
            })
            _write.apply(stream, arguments)
        }*/
        f.apply(this, arguments)
    }
}