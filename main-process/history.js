const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('transaction-history', async (event, data) => {
    let result = await db.searchTransaction(data);
    event.sender.send('transaction-history-data', result);
}); 