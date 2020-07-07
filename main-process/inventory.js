const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('inventory-start', async (event, data) => {
    let listItems = await db.searchAllItems(data);
    event.sender.send('list-items-inventory', listItems, data);
});

ipcMain.on('main-start', async (event, data) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
        'Oktober', 'November', 'Desember'];
    const { month, year } = data;
    let newMonth = months[Number(month) - 1];
    const newData = {
        month: newMonth,
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