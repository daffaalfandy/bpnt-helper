const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const backBtn = document.getElementById('btn-back-detail-transaction');
let kksDetailField = document.getElementById('kks-detail-field');
let nameDetailField = document.getElementById('name-detail-field');
let addressField = document.getElementById('kpm-detail-address');
let dateTimeField = document.getElementById('datetime-transaction');
let tableField = document.getElementById('table-detail-transaction');

backBtn.addEventListener('click', () => {
    inputSection.handleInputTrigger('show-history');
});

ipcRenderer.on('transaction-detail-data', (event, data) => {
    kksDetailField.innerHTML = data.kpmData.kks.match(/.{1,4}/g).join("-");
    nameDetailField.innerHTML = data.kpmData.name;
    addressField.innerHTML = `${data.kpmData.dusun}, RT ${data.kpmData.rt} ${data.kpmData.village} ${data.kpmData.district}`;
    dateTimeField.innerHTML = `${data.dateTime.date} - ${data.dateTime.newMonth} - ${data.dateTime.year}`;

    let resultHtml = '';
    for (var i = 0; i < data.items.length; i++) {
        resultHtml += `<tr>
        <td>${i + 1}</td>
        <td>${data.items[i].name}</td>
        <td>${data.items[i].quantity} ${data.items[i].unit}</td>
        </tr>`
    }

    tableField.innerHTML = resultHtml;
});