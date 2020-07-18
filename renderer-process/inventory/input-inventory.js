const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnCancel = document.getElementById('cancel');
const btnSimpan = document.getElementById('btn-confirm');
let nameField = document.getElementById('item-name');
let buyPriceField = document.getElementById('item-buyprice');
let sellPriceField = document.getElementById('item-sellprice');
let quantityField = document.getElementById('item-qty');
let unitField = document.getElementById('item-unit');
let date = {};
let tempQty = 0;
let sumOfQuantity = 0;
let itemId;
let isEdit = false;

ipcRenderer.on('res-month-year-input-inventory', (event, data) => {
    date = data;
})

btnCancel.addEventListener('click', () => {
    inputSection.handleInputTrigger('inventory');
});

ipcRenderer.on('res-edit-item', (event, data) => {
    nameField.value = data.name;
    buyPriceField.value = data.buyPrice;
    sellPriceField.value = data.sellPrice;
    quantityField.value = data.quantity;
    unitField.value = data.unit;
    tempQty = data.quantity;
    sumOfQuantity = data.sumOfQuantity;
    itemId = data._id;
    isEdit = true;
});

btnSimpan.addEventListener('click', () => {
    const { month, year } = date;
    let name = nameField.value;
    let buyPrice = Number(buyPriceField.value);
    let sellPrice = Number(sellPriceField.value);
    let quantity = Number(quantityField.value);
    let unit = unitField.value;
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

    if (!isEdit) {

        ipcRenderer.send('inventory-add-item', data);
    } else {
        let temp = quantity - tempQty
        sumOfQuantity += temp;
        data.sumOfQuantity = sumOfQuantity;
        ipcRenderer.send('inventory-edit-item', data, itemId);
    }
    ipcRenderer.send('inventory-start', date);
    inputSection.handleInputTrigger('inventory');
});
