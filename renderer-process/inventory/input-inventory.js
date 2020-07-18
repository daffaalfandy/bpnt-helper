const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnCancel = document.getElementById('cancel');
const btnSimpan = document.getElementById('btn-confirm');
let date = {};

ipcRenderer.on('res-month-year-input-inventory', (event, data) => {
    date = data;
})

btnCancel.addEventListener('click', () => {
    inputSection.handleInputTrigger('inventory');
});

btnSimpan.addEventListener('click', () => {
    const { month, year } = date;
    let name = document.getElementById('item-name').value;
    let buyPrice = Number(document.getElementById('item-buyprice').value);
    let sellPrice = Number(document.getElementById('item-sellprice').value);
    let quantity = Number(document.getElementById('item-qty').value);
    let unit = document.getElementById('item-unit').value;
    let data = {
        name,
        buyPrice,
        sellPrice,
        quantity,
        sumOfQuantity: quantity,
        unit,
        month,
        year
    };
    ipcRenderer.send('inventory-add-item', data);
    ipcRenderer.send('inventory-start', date);
    inputSection.handleInputTrigger('inventory');
});
