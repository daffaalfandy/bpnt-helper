const { ipcMain } = require('electron');
const db = require('../Datastore');

ipcMain.on('transaction-detail', async (event, id) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
        'Oktober', 'November', 'Desember'];
    let transactionData = await db.searchOneTransaction({ _id: id });
    let { date, month, year } = transactionData.dateTimeData;
    let newMonth = months[Number(month) - 1];
    let kpmData = await db.searchOneKPM('kks', transactionData.kks);
    let items = [];

    for (var i = 0; i < transactionData.items.length; i++) {
        let itemData = await db.searchItem({ _id: transactionData.items[i].itemId });
        items.push({ name: itemData.name, unit: itemData.unit, quantity: transactionData.items[i].quantity });
    }

    let data = {
        kpmData,
        dateTime: { date, newMonth, year },
        items,
    }
    event.sender.send('transaction-detail-data', data);
});