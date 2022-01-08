const electron = require("electron")
const url = require("url")
const path = require("path");

const { app, BrowserWindow, Menu, focusedWindow, ipcMain } = electron

let mainWindow;
let addNew

function createWindow(){
  const mainWindow = new BrowserWindow({
    transparent:true,
    webPreferences: {
      nodeIntegration: true,      
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  mainWindow.loadFile('main.html')
}

function addWindow(){
  addNew = new BrowserWindow({
    width:500,
    height:300,
    title:"New Window",
    transparent:true,
    webPreferences: {
      nodeIntegration: true,      
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame:false
  })
  addNew.loadFile('pages/newWindow.html')
  addNew.setResizable(false);
  addNew.on("close", () => {
    addNew = null;
  });
}

app.whenReady().then(()=>{
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
   
    mainWindow.on("close",()=>{
      app.quit()
      addNew=null
    })
  })

  const mainMenu = Menu.buildFromTemplate(mainManuTemplate)
  Menu.setApplicationMenu(mainMenu)

  ipcMain.on("key:inputValue",(err,data)=>{
    console.log(data)
  })

  ipcMain.on("key:openNewWindow",()=>{

  })

  ipcMain.on("newWindow:close",()=>{
    addNew.close()
    addNew=null
  })

})


const mainManuTemplate = [
  {
    label: "Dosya",
    submenu : [
      {label: "New Item",click(){addWindow()}},
      {label: "Delete"},
      {label: "Quit", role:"quit"}
    ]
  },
  
]

if(process.env.NODE_ENV !== "production"){
  mainManuTemplate.push(
    {
      label:"Dev Tools",
      submenu:[
        {
          label:"Dev Window",
          click(item, focusedWindow){
            focusedWindow.toggleDevTools()
          }
        },
        {
          label:"Refresh",
          role:"reload"
        }
      ]
    }
  )
}