const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let itemsHistoryField = document.getElementById('history-table');

ipcRenderer.on('transaction-history-data', (event, items) => {
    console.log(items);
    itemsHistoryField.innerHTML = '';
    let result = '';
    let index = 0;
    if (items.length > 0) {
        // for (var i = 0; i < items.length; i++) {

        // }
        items.forEach(item => {
            result += `<tr>
            <td>${index + 1}</td>
            <td>${item.kks}</td>
            <td>${item.name}</td>
            <td><button id="btn-history-detail" data-history="${item}" class="btn btn-info">Detail Transaksi</button></td>
            </tr>`
            index++;
        });
        itemsHistoryField.innerHTML = result;
    } else {
        result = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>'
        itemsHistoryField.innerHTML = result;
    }
});