var UserEntity = require('./entity')

module.exports = {
    createFromName : createFromName
}

function createFromName(id){
    return new UserEntity({
        id: id
    })
}