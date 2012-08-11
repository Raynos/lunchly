var EventEmitter = require("events").EventEmitter
    , StreamServer = require("browser-stream-server")
    , StreamClient = StreamServer
    , globalContext = new Function('return this')()
    , PauseStream = require("pause-stream")
    , uuid = require("node-uuid")
    , forEach = require("iterators").forEach

module.exports = StreamSet

function StreamSet(mdm, uri) {
    var streamSet = new EventEmitter()
        , channel = mdm.createStream(uri + "/channel")
        , store = {}
        , buffer = PauseStream().pause()
        , id = uuid()

    console.log("channel stream ", uri + "/channel")

    channel.on("end", function () {
        console.log("channel dead")
    })

    // request a sync
    channel.write(JSON.stringify({
        event: "sync"
        , id: id
    }))

    channel.on("data", function (data) {
        console.log("channel data", JSON.parse(data))
    })

    // open a stream connection to the sync server
    var syncStream = StreamClient(mdm, {
        prefix: uri + "/proxy"
    }).connect(id)
    // when we get data from the server it's the initial state
    syncStream.once("data", syncState)
    syncStream.once("end", emitReady)

    // buffer the channel until we have the initial data
    channel.pipe(buffer)

    // mutate set when channel emits change event
    buffer.on("data", handleStateChange)

    // expose set methods
    streamSet.set = set
    streamSet.get = get
    streamSet.has = has
    streamSet.delete = $delete
    streamSet.keys = keys

    return streamSet

    function syncState(data) {
        data = JSON.parse(data)
        forEach(data, setOnStore)
        syncStream.end()
    }

    function emitReady(data) {
        console.log("emit ready called")
        streamSet.emit("ready")
        buffer.resume()
    }

    function setOnStore(value, key) {
        store[key] = value
    }

    function handleStateChange(data) {
        var key, value, id, event
        data = JSON.parse(data)
        console.log("buffer data", data)
        event = data.event
        if (event === "set") {
            key = data.key
            value = data.value
            store[key] = value
            streamSet.emit("set", value, key, store)
        } else if (event === "delete") {
            key = data.key
            value = data.value
            ;delete store[key]
            streamSet.emit("delete", value, key, store)
        } else if (event === "sync") {
            id = data.id
            var server = StreamServer(mdm, {
                prefix: uri + "/proxy"
            }, function (stream) {
                stream.write(JSON.stringify(store))
                stream.end()
                server.end()
            }).listen(id)
        }
    }

    function set(key, value) {
        store[key] = value
        console.log("writing to channel")
        channel.write(JSON.stringify({
            event: "set"
            , key: key
            , value: value
        }))
    }

    function get(key) {
        return store[key]
    }

    function has(key) {
        return key in store
    }

    function $delete(key) {
        delete store[key]
        channel.write(JSON.stringify({
            event: "delete"
            , key: key
        }))
    }

    function keys() {
        return Object.keys(store)
    }

    function values() {
        return Object.keys(store).map(toValue, store)
    }

    function toArray() {
        return Object.keys(store).map(toKeyValue, store)
    }

    function iterate(callback, context) {
        var keys = Object.keys(store)
            , length = keys.length

        context = context || globalContext

        for (var i = 0; i < length; i++) {
            var key = keys[i]
                , value = store[key]

            callback.call(context, value, key, store)
        }
    }
}

function toValue(key) {
    return this[key]
}

function toKeyValue(key) {
    return {
        key: key
        , value: this[key]
    }
}