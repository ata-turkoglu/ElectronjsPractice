const {ipcRenderer} = require("electron")

let inputValue = document.querySelector("#value")
let sendBtn = document.querySelector("#sendBtn")
checkEmpty()

sendBtn.addEventListener("click",()=>{
  ipcRenderer.send("key:inputValue",inputValue.value)
})

ipcRenderer.on("list:addItem",(err,data)=>{
  let container = document.querySelector("#container")
  const row = document.createElement("div")
  row.className="row"
  const col = document.createElement("div")
  col.className="listItem p-2 mb-3 text-light bg-dark col-md-8 offset-2 shadow card d-flex justify-content-center flex-row align-items-center"
  const p = document.createElement("p")
  p.className="m-0 w-100"
  p.innerText=data.text
  const deleteBtn = document.createElement("button")
  deleteBtn.className="btn btn-sm btn-outline-danger flex-shrink-1"
  deleteBtn.innerText="X"
  deleteBtn.addEventListener("click",()=>{
    if(confirm("Are You Sure to Delete?")){
      
    }
  })
  col.appendChild(p)
  col.appendChild(deleteBtn)
  row.appendChild(col)
  container.appendChild(row)
  checkEmpty()
})


function checkEmpty(){
  const container = document.querySelector("#container")
  const alert = document.querySelector("#empty")
  if(container.children.length!==0){
    alert.style.display="none"
  }else{
    alert.style.display="block"
  }
}



