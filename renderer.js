const {ipcRenderer} = require("electron")

let inputValue = document.querySelector("#value")
let sendBtn = document.querySelector("#sendBtn")
let openNewWindow = document.querySelector("#openNewBtn")

sendBtn.addEventListener("click",()=>{
  ipcRenderer.send("key:inputValue",inputValue.value)
})

openNewWindow.addEventListener("click",()=>{
  ipcRenderer.send("key:openNewWindow")
})



