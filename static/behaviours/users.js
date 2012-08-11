var mdm = require("../lib/mdm")
    , EventEmitter = require("events").EventEmitter

module.exports = UserSet

function UserSet() {
    var users = new EventEmitter()
        , channel = mdm.createStream("/users")
        , set = {}

    users.add = add
    users.remove = remove

    channel.on("data", handleStateChange)

    return users

    function add(user) {
        
        channel.write(JSON.stringify({
            event: "add"
            , key: user.id
            , value: user
        }))
    }

    function remove(user) {
        channel.write(JSON.stringify({
            event: "remove"
            , key: user.id
            , value: user
        }))
    }
}