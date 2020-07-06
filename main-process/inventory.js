const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('inventory-start', (event, data) => {
    const { month, year } = data;
    event.sender.send('list-items-inventory');
});

ipcMain.on('main-start', async (event, data) => {
    const { month, year } = data;
    const newData = {
        month,
        year
    };
    let result = await db.searchAllItems(newData);
    event.sender.send('list-items-transaction', result);
})