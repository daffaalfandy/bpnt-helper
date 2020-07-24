const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('main-start', async (event, data) => {
    let { date, month, year, kks } = data;
    let kksNum = '';
    for (i = 0; i < 4; i++) {
        kksNum += kks[i];
    }
    let result = await db.searchOneKPM('kks', kksNum);
    let datetime = {
        date,
        month,
        year,
    };
    if (!result) {
        event.sender.send('res-input-kks', result);
    } else {
        event.sender.send('res-input-kks', result);
        event.sender.send('res-kpm-data', result);
    }
    event.sender.send('res-transaction-date', datetime);
    event.sender.send('res-kks', kks);
});

ipcMain.on('kpm-data-input', async (event, data) => {
    db.insertOneKPM(data);
    event.sender.send('res-kpm-data', data);
});

ipcMain.on('kpm-data-input-inventory', async (event, data) => {
    db.insertOneKPM(data);
});

ipcMain.on('transaction-data', async (event, data) => {
    let { items } = data;
    for (var i = 0; i < items.length; i++) {
        let itemData = await db.searchItem({ _id: `${items[i].itemId}` });
        let prevQuantity = itemData.quantity;
        let quantity = Number(prevQuantity) - Number(items[i].quantity)
        db.updateItem(itemData._id, { quantity });
    }
    db.insertTransaction(data);
});

ipcMain.on('input-kpm-from-inventory', async (event) => {
    event.sender.send('confirm-input-kpm-from-inventory');
});