const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('transaction-history', async (event, data) => {
    let result = await db.searchTransaction(data);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
        'Oktober', 'November', 'Desember'];
    const { date, month, year } = data.dateTimeData;
    let newMonth = months[Number(month) - 1];
    const newData = {
        date,
        month: newMonth,
        year
    };
    event.sender.send('transaction-history-data', result, newData);
}); 