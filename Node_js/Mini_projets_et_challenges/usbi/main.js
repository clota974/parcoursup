let windowPreferences = {width: 800, height: 600}
let mainHTML = "index.html"
let openDevTools = false;



const {app, BrowserWindow} = require("electron")
const path = require("path")
const url = require("url")

let win

function creteWindow() {
    win = new BrowserWindow(windowPreferences)

    win.loadURL(url.format({
        pathname: path.join(__dirname+mainHTML),
        protocol: "file:",
        slashes: true
    }))

    if(openDevTools)
        win.webContents.openDevTools()

    win.on("closed", ()=>{
        win = null
    })
}

app.on("ready", createWindow)

app.on("window-all-closed", ()=>{
    if(process.platform !== 'darwin')
        app.quit()
})

app.on("activate", ()=>{
    if(win === null)
        createWindow()
})