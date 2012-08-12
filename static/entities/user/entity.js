module.exports = UserEntity

function UserEntity(data){
    this.id = data.id
    this.name = data.name
    this.group = data.group || null
}

UserEntity.prototype.toJSON = toJSON

function toJSON() {
    return {
        id: this.id
        , name: this.name
    }
}