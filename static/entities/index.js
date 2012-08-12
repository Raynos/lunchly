var userFactory = require("./user/factory").createFromName
    , groupFactory = require("./group/factory").createFromName

module.exports = {
    user: userFactory
    , group: groupFactory
}