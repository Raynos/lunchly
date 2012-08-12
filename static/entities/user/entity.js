module.exports = UserEntity

function UserEntity(data){
    this.id = data.id
    this.name = data.name
}

UserEntity.prototype.toJSON = toJSON

function toJSON() {
    return {
        id: this.id
        , name: this.name
    }
}