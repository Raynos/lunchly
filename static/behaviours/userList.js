var mdm = require("../lib/mdm")
    , StreamSet = require("../lib/streamSet")

var userList = StreamSet(mdm, "/users")

module.exports = userList