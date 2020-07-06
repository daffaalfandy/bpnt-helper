const { ipcMain } = require('electron');

ipcMain.on('inventory-start', (event, data) => {
    const { month, year } = data;
    event.sender.send('res-show-inventory');
})