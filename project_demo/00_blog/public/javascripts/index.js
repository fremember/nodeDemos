import { aa } from './model.js'
function clickEvent () {
    console.log(123)
}
document.getElementById('myId').onclick = function() {
    console.log(aa)
}
