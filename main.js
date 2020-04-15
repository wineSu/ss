const { app, BrowserWindow, Menu, ipcMain } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1100,
    height: 800,
    frame: false,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  win.setAlwaysOnTop(true)
  Menu.setApplicationMenu(null);
  // win.webContents.openDevTools()
  // 加载index.html文件
  win.loadFile('./apps/index.html');
  ipcMain.on('windowClose', e => win.close());
  ipcMain.on('small', e => {
    win.setAlwaysOnTop(false)
    win.minimize()
  });
}

app.whenReady().then(createWindow)
app.setLoginItemSettings({
  openAtLogin: true, // Boolean 在登录时启动应用
})