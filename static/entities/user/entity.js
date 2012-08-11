module.exports = UserEntity

function UserEntity(data){
    this.name = data
}
UserEntity.prototype.setName = function setName(name){
    this.name = name
}