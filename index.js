const { app, BrowserWindow } = require('electron');
const glob = require('glob');
const path = require('path');
const url = require('url');

let mainWindow = null;
// SET ENV
process.env.NODE_ENV = 'prod';

function initialize() {
    makeSingleInstanceLock();
    loadJS();

    function createWindow() {
        const windowOptions = {
            width: 1366,
            height: 768,
            title: 'BPNT Helper',
            webPreferences: {
                nodeIntegration: true
            }
        };

        mainWindow = new BrowserWindow(windowOptions);
        // mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }))

        if (process.env.NODE_ENV !== 'prod') {
            mainWindow.webContents.openDevTools();
        }

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    app.on('ready', () => {
        createWindow();
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    })
}

function makeSingleInstanceLock() {
    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });
}

// Require each JS file in the main-process dir
function loadJS() {
    const files = glob.sync(path.join(__dirname, 'main-process/*.js'));
    files.forEach((file) => {
        require(file);
    });
}

initialize();