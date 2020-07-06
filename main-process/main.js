const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('main-start', async (event, data) => {
    let { date, month, year, kks } = data;
    let result = await db.searchOneKPM(kks, data);
    let datetime = {
        date,
        month,
        year,
    };
    event.sender.send('res-input-kks', result);
    event.sender.send('res-transaction-date', datetime);
    event.sender.send('res-kks', kks);
});

ipcMain.on('kpm-data-input', (event, data) => {
    db.insertOneKPM(data);
});