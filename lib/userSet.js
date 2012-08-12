var StreamSet = require("./streamSet")

module.exports = UserSetProxy

function UserSetProxy(uri) {
    var router = StreamSet(uri)
        , store = router.streamStore

    router.addRoute(uri + "/identify", identify)

    return router

    function identify(stream, params) {
        var storeId = uri + "/channel"
            , channelStream = store.get(storeId)
            , hasUser

        stream.on("data", ondata)
        stream.on("end", onend)

        function ondata(data) {
            data = JSON.parse(data)

            if (data.event === "identify") {
                var user = data.user
                    , key = user.id

                hasUser = user

                channelStream.write(JSON.stringify({
                    event: "set"
                    , key: key
                    , value: user
                }))
            }
        }

        function onend() {
            if (hasUser) {
                channelStream.write(JSON.stringify({
                    event: "delete"
                    , key: hasUser.id
                }))
            }
        }
    }
}