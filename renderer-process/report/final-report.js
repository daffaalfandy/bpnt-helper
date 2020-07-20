const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let btnBackReport = document.getElementById('btn-back-final-report');
let btnToPdf = document.getElementById('btn-final-pdf');
let titleField = document.getElementById('final-title');
let finalTableField = document.getElementById('final-report-table');

ipcRenderer.on('final-report-data', (event, items) => {
    console.log(items);
    titleField.innerHTML = `Toko Hari, ${items[0].month} ${items[0].year}`;
    let htmlResult = '';
    if (items.length > 0) {
        items.forEach((item, index) => {
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.sumOfQuantity - item.quantity}</td>
            </tr>`
        })
    } else {
        htmlResult += `<tr><td>-</td><td>-</td><td>-</td></tr>`
    }
    finalTableField.innerHTML = htmlResult;
});

btnBackReport.addEventListener('click', (e) => {
    titleField.innerHTML = '';
    finalTableField.innerHTML = '';
    inputSection.handleInputTrigger('report');
});