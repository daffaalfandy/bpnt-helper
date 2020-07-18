const { ipcRenderer } = require('electron');

let kksData;
let monthYear;
let btnBuy = document.getElementById('btn-buy');
let backBtn = document.getElementById('back-btn-transaction');
let kksField = document.getElementById('kks-field');
let nameField = document.getElementById('name-field');
let itemsField = document.getElementById('items-list');
let sumOfAllField = document.getElementById('sum-of-price');
let itemsData = [];
let sumOfItems = 0;

// Receive kpm data
ipcRenderer.on('res-kpm-data', (event, result) => {
    const { kks, name } = result;
    kksData = kks;
    const kksNum = kks.match(/.{1,4}/g);
    kksField.innerHTML = `No. KKS: ${kksNum[0]}-${kksNum[1]}-${kksNum[2]}-${kksNum[3]}`;
    nameField.innerHTML = `Nama KPM: ${name}`;
});

// Receive date
ipcRenderer.on('res-transaction-date', (event, result) => {
    const { date, month, year } = result;
    monthYear = {
        month,
        year
    };
    const datetime = `${year}-${month}-${date}`
    document.getElementById('datepick-goal').value = datetime;
});

// Receive items data
ipcRenderer.on('list-items-transaction', (event, items) => {
    itemsField.innerHTML = '';
    if (items.length > 0) {
        let result = '';
        let no = 0;
        items.forEach(item => {
            result += `<tr>
            <td>${no + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity} ${item.unit}</td>
            <td>@ Rp${item.sellPrice}</td>
            <td>
            <div id="${item._id}" data-id="${item._id}" data-quantity="${item.quantity}" class="def-number-input bg-light number-input text-light mx-auto">
            <button id="btn-minus" class="minus"></button>
            <input readonly class="quantity" min="0" name="quantity" value="0" type="number">
            <button id="btn-plus" class="plus"></button>
            </div>
            </td>
            <td id="price-field" data-sellprice="${item.sellPrice}"></td>
            </tr>`
            itemsData[no] = {
                id: item._id,
                nama: item.nama,
                sum: 0
            }
            no++;
        });
        itemsField.innerHTML = result;
    } else {
        let result = `<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`;
        itemsField.innerHTML = result;
    }
});

itemsField.addEventListener('click', function (e) {
    if (e.target.nodeName == 'BUTTON') {
        if (e.target.id == 'btn-plus') {
            let node = e.target.parentNode;
            addItem(node);
        } else if (e.target.id == 'btn-minus') {
            let node = e.target.parentNode;
            lessItem(node);
        }
    }
});

function addItem(parentEvent) {
    let valueInput = parentEvent.querySelector('input[type=number]');
    if (valueInput.value < Number(parentEvent.dataset.quantity)) {
        valueInput.stepUp();
        let value = Number(valueInput.value);
        setSumOfPrice(parentEvent, value, 'plus');
    }
}

function lessItem(parentEvent) {
    let valueInput = parentEvent.querySelector('input[type=number]');
    valueInput.stepDown();
    let value = Number(valueInput.value);
    setSumOfPrice(parentEvent, value, 'minus');
}

function setSumOfPrice(parentEvent, value, action) {
    let priceField = parentEvent.parentNode.parentNode.querySelector('#price-field');
    let sellPrice = Number(priceField.dataset.sellprice);
    let sumOfPrice = sellPrice * value;
    priceField.innerHTML = `Rp${sumOfPrice}`;
    if (sumOfAllField.innerHTML == '' || sumOfAllField.innerHTML == 'Rp0') {
        sumOfAllField.innerHTML = `Rp${sumOfPrice}`
    } else {
        let sumOfAll = Number(sumOfAllField.innerHTML.substring(2));
        if (action == 'plus') {
            sumOfAll += sellPrice;
        } else if (action == 'minus') {
            sumOfAll -= sellPrice;
        }
        sumOfAllField.innerHTML = `Rp${sumOfAll}`;
    }
}

btnBuy.addEventListener('click', () => {
    itemsField.innerHTML = '';
    document.getElementById('sum-of-price').innerHTML = '';
    itemsData.kks = kksData;
    ipcRenderer.send('transaction', itemsData, monthYear, sumOfItems);
    itemsData = [];
    sumOfItems = 0;
});

backBtn.addEventListener('click', () => {
    itemsField.innerHTML = '';
});