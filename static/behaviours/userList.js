var mdm = require("../lib/mdm")
    , UserSet = require("../lib/userSet")

var userList = UserSet(mdm, "/users")

module.exports = userList