module.exports = UserListEntity

function UserListEntity(data){
    data = data || {}
    this.users = data.users || []
}

UserListEntity.prototype.addUser = function addUser(user){
    this.users.push(user)
}