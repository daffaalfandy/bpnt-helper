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