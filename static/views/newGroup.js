module.exports = newGroup

function newGroup(groupList){
    var newGroupField = document.getElementById('newGroup')
        , newGroupButton = document.getElementById('newGroup-button')

        newGroupButton.addEventListener('click',buttonClick)

        function buttonClick(){
            var groupName = newGroupField.value
            groupList.newGroup(groupName)
        }
}