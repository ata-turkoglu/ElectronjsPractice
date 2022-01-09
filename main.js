const electron = require("electron")

const { app, BrowserWindow, Menu, focusedWindow, ipcMain } = electron

let mainWindow, addNew
let list = []

function createWindow(){
  mainWindow = new BrowserWindow({
    width:1000, height:600,
    webPreferences: {
      nodeIntegration: true,      
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  mainWindow.setResizable(true)
  mainWindow.loadFile('main.html')

  mainWindow.on("closed",()=>{
    mainWindow=null
  })
}

function addWindow(){

  addNew = new BrowserWindow({
    width:350,
    height:300,
    title:"New Window",
    transparent:true,
    webPreferences: {
      nodeIntegration: true,      
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame:false,
    parent:mainWindow
  })
  
  addNew.loadFile('pages/newWindow.html')
  addNew.setResizable(false);
  ipcMain.on("newWindow:close",()=>{
    addNew.close()
    addNew=null
  })
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

  app.on("window-all-closed",()=>{
    if(process.platform!== "darwin"){
      app.quit()
    }
  })

  ipcMain.on("newWindow:save",(err,data)=>{
    if(data){
      let obj={
        id:list.length+1,
        text:data
      }
      list.push(obj)
      mainWindow.webContents.send("list:addItem",obj)
      addNew.close()
      addNew=null
    }
  })

  const mainMenu = Menu.buildFromTemplate(mainManuTemplate)
  Menu.setApplicationMenu(mainMenu)

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