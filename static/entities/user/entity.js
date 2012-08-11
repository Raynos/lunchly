module.exports = UserEntity

function UserEntity(data){
    this.id = data.id
}

UserEntity.prototype.toJSON = toJSON

function toJSON() {
    return {
        id: this.id
    }
}