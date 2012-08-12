var UserEntity = require('./entity')

module.exports = {
    createFromName : createFromName
}

function createFromName(name){
    return new UserEntity({
        id: name
        , name: name
    })
}