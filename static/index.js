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

//userListController.addUser(User(uuid()))

var usernameField = document.getElementById("username")
    , enterAppButton = document.getElementById("enter-app")
    , userName = store.get('name')

if(userName!==null){
    usernameField.value = userName
}

enterAppButton.addEventListener('click', buttonclick)

function buttonclick(event){
    var username = usernameField.value
    store.set('name', username)
    userList.identify(User(username))
}
