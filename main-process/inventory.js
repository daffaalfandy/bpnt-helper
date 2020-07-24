const { ipcMain } = require('electron');
const db = require('../Datastore');

let monthYear = {};

ipcMain.on('inventory-start', async (event, data) => {
    let listItems = await db.searchAllItems(data);
    event.sender.send('list-items-inventory', listItems, data);
    monthYear = data;
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

ipcMain.on('after-delete', async (event) => {
    let result = await db.searchAllItems(monthYear);
    event.sender.send('list-items-inventory', result, monthYear);
});

ipcMain.on('inventory-add-item', async (event, data) => {
    db.insertItem(data);
});

ipcMain.on('month-year-input-inventory', async (event, data) => {
    event.sender.send('res-month-year-input-inventory', data);
});

ipcMain.on('edit-item', async (event, id) => {
    let result = await db.searchItem({ _id: id });
    event.sender.send('res-edit-item', result);
});

ipcMain.on('delete-item', async (event, id) => {
    db.deleteItem({ _id: id });
    event.sender.send('items-deleted');
});

ipcMain.on('inventory-edit-item', async (event, data, itemId) => {
    db.updateItem(itemId, data);
    let result = await db.searchAllItems(monthYear);
    event.sender.send('list-items-inventory', result, monthYear);
});

ipcMain.on('list-all-kpm', async (event) => {
    let result = await db.searchAllKpm();
    event.sender.send('list-all-kpm-data', result);
});