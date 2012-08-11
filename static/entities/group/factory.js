var groupEntity = require('./entity')

module.exports = {
    createFromName : createFromName
}

function createFromName(name){
    return new groupEntity({
        name : name
    })
}