const { app, BrowserWindow} = require('electron');

const path = require('path');

const url = require('url');

const process = require('process');

process.env['NODE_ENV'] = 'development';

var mainWindow, indexPath;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            // preload: path.join(__dirname, "preload.js") // use a preload script
        }
    });

if (process.env.NODE_ENV === 'development') {

mainWindow.webContents.openDevTools();

indexPath = url.format({

protocol: 'http:',

host: 'localhost:8080',

pathname: 'index.html',

slashes: true,

});

} else {

console.log("Not dev")

indexPath = path.resolve(__dirname, 'dist/index.html')

}

mainWindow.loadURL(indexPath);

mainWindow.on('closed', () => {

mainWindow = null;

});

};

app.on('ready', () => {

createWindow()

});

app.on('window-all-closed', () => {

if (process.platform !== 'darwin') {

app.quit();

}

});

app.on('activate', () => {

if (BrowserWindow.getAllWindows().length === 0) {

createWindow();

}

});