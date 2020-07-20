const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('final-report', async (event, datetime) => {
    let result = await db.searchAllItems({ month: datetime.month, year: datetime.year });
    event.sender.send('final-report-data', result);
});

ipcMain.on('profit-report', async (event, datetime) => {
    let itemsData = await db.searchAllItems({ month: datetime.month, year: datetime.year });
    let transactionData = await db.searchTransaction({ month: datetime.oldMonth, year: datetime.year });
    event.sender.send('profit-report-data', { itemsData, transactionData });
});