const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let itemsHistoryField = document.getElementById('history-table');

ipcRenderer.on('transaction-history-data', (event, items) => {
    itemsHistoryField.innerHTML = '';
    let result = '';
    let index = 0;
    if (items.length > 0) {
        items.forEach(item => {
            result += `<tr>
            <td>${index + 1}</td>
            <td>${splitKKS(item.kks)}</td>
            <td>${item.name}</td>
            <td><button id="btn-history-detail" data-id="${item._id}" data-items="${item.items}" class="btn btn-info">Detail Transaksi</button></td>
            </tr>`
            index++;
        });
        itemsHistoryField.innerHTML = result;
    } else {
        result = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>'
        itemsHistoryField.innerHTML = result;
    }
});

function splitKKS(kks) {
    let split = kks.match(/.{1,4}/g).join("-");
    return split;
}

itemsHistoryField.addEventListener('click', (event) => {
    if (event.target.id == 'btn-history-detail') {
        let transactionId = event.target.dataset.id;
        ipcRenderer.send('transaction-detail', transactionId);
        inputSection.handleInputTrigger('transaction-detail');
    }
})