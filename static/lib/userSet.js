var StreamSet = require("./streamSet")

function UserSet(mdm, uri) {
    var streamSet = StreamSet(mdm, uri)
        , identifyStream = mdm.createStream(uri + "/identify")

    ;delete streamSet.set
    ;delete streamSet.delete

    streamSet.identify = identify

    return streamSet

    function identify(user) {
        identifyStream.write(JSON.stringify({
            event: "identify"
            , user: user
        }))
    }
}