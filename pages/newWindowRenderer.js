const {ipcRenderer} = require("electron")

let cancelBtn=document.querySelector("#cancelBtn")
let saveBtn=document.querySelector("#saveBtn")
let newInput=document.querySelector("#newInput")

cancelBtn.addEventListener("click",()=>{
  ipcRenderer.send("newWindow:close")
})
saveBtn.addEventListener("click",()=>{
  ipcRenderer.send("newWindow:save",newInput.value)
})