var UserListEntity = require('./entity')

module.exports = {
    create : create
    , createFromUserList : createFromUserList
}

function create(){
    return new UserListEntity()
}

function createFromUserList(list){
    return new UserListEntity({
        users : list
    })
}