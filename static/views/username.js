var LocalStore = require('local-store')
    , store = LocalStore.createStore('userStore')
    , EventEmitter = require("events").EventEmitter

module.exports = UserName

function UserName(userList) {
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
        userList.identify(username)
    }
}