var raphael = require('../lib/raphael')

module.exports = UserListController

function UserListController(paper){

}
UserListController.prototype.addUser = addUser

function addUser(user){
    paper.rect(50, 40, 10)
}

