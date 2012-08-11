module.exports = GroupEntity

function GroupEntity(data){
    this.name = data
}
GroupEntity.prototype.setName = function setName(name){
    this.name = name
}