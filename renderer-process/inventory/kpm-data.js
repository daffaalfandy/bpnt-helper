const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let kpmDataTableField = document.getElementById('kpm-table');
let btnKpmDataSearch = document.getElementById('btn-kpm-data-search');
let oldKpmData = [];

ipcRenderer.on('list-all-kpm-data', (event, result) => {
    oldKpmData = [...result];
    let htmlResult = '';
    if (oldKpmData.length > 0) {
        oldKpmData.forEach((item, index) => {
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${splitKKS(item.kks)}</td>
            <td>${item.name}</td>
            <td>${item.dusun} RT${item.rt} ${item.village} ${item.district} Bantul</td>
            </tr>`
        });
    } else {
        htmlResult = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>'
    }
    kpmDataTableField.innerHTML = htmlResult;
});

function splitKKS(kks) {
    let split = kks.match(/.{1,4}/g).join("-");
    return split;
}