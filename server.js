var browserifyServer = require("browserify-server")
    , http = require("http")
    , path = require("path")

var handler = browserifyServer(path.join(__dirname, "static"))
    , server = http.createServer(handler).listen(process.argv[2] || 8080)

module.exports = server