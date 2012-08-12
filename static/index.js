var controllers = require('./controllers/')
    , PaperController = controllers.paperController
    , UserListController = controllers.userList
    , behaviours = require("./behaviours/")
    , userList = behaviours.userList
    , entities = require("./entities")
    , uuid = require("node-uuid")
    , User = entities.user
    , LocalStore = require('local-store')
    , store = LocalStore.createStore('userStore')
    , ENTER = 13

var paperController = new PaperController()

var userListController = new UserListController(
    paperController.paper
    , userList
)

userListController.addUser(User(uuid()))

console.log("entry!",paperController)
var usernameField = document.getElementById("username")
    , userName = store.get('name')

if(userName!==null){
    usernameField.value = userName
}

usernameField.addEventListener('keyup',usernameKeyup)

function usernameKeyup(event){
    if(event.which === ENTER){
        store.set('name',usernameField.value)
    }
}
