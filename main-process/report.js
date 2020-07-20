const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('final-report', async (event, datetime) => {
    let result = await db.searchAllItems({ month: datetime.month, year: datetime.year });
    event.sender.send('final-report-data', result);
})