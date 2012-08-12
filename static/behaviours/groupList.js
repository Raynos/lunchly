var mdm = require("../lib/mdm")
    , StreamSet = require("../lib/streamSet")

var groupList = StreamSet(mdm, "/groups")

module.exports = groupList