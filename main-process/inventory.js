const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('inventory-start', async (event, data) => {
    let listItems = await db.searchAllItems(data);
    event.sender.send('list-items-inventory', listItems, data);
});

ipcMain.on('main-start', async (event, data) => {
    const { month, year } = data;
    const newData = {
        month,
        year
    };
    let result = await db.searchAllItems(newData);
    event.sender.send('list-items-transaction', result);
});

ipcMain.on('inventory-add-item', async (event, data) => {
    db.insertItem(data);
});

ipcMain.on('month-year-input-inventory', async (event, data) => {
    event.sender.send('res-month-year-input-inventory', data);
})