let kksData;
let monthYear;
let btnBuy = document.getElementById('btn-buy');
let backBtn = document.getElementById('back-btn-transaction');
let kksField = document.getElementById('kks-field');
let nameField = document.getElementById('name-field');
let itemsField = document.getElementById('items-list');
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
            <td>@Rp${item.sellPrice}</td>
            <td>
            <div class="def-number-input bg-light number-input text-light mx-auto">
            <button id="btn-minus" onclick="kurang(this.parentNode.querySelector('input[type=number]'), ${item.sellPrice}, ${no}, '${item._id}', '${item.name}', this.parentNode.querySelector('#btn-minus'))" class="minus"></button>
            <input readonly class="quantity" min="0" name="quantity" value="0" type="number">
            <button id="btn-plus" onclick="tambah(this.parentNode.querySelector('input[type=number]'), ${item.quantity}, ${item.sellPrice}, ${no}, '${item._id}', '${item.name}', this.parentNode.querySelector('#btn-minus'))" class="plus"></button>
            </div>
            </td>
            <td id="${no}"></td>
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

function kurang(event, sellPrice, arrayIndex, itemId, name, btnEvent) {
    event.stepDown();
    setPrice(Number(event.value), Number(sellPrice), arrayIndex);
    sumOfItems -= sellPrice;
    setSum();
    itemsData[arrayIndex] = {
        id: itemId,
        name,
        sum: Number(event.value)
    }
    if (Number(event.value) === 0) {
        btnEvent.disabled = true;
    }
}
function tambah(event, quantity, sellPrice, arrayIndex, itemId, name, btnMinus) {
    if (event.value < quantity) {
        event.stepUp();
        setPrice(Number(event.value), Number(sellPrice), arrayIndex);
        sumOfItems += sellPrice;
        setSum();
        itemsData[arrayIndex] = {
            id: itemId,
            name,
            sum: Number(event.value)
        }
        btnMinus.disabled = false;
    }
}

function setPrice(sum, sellPrice, arrayIndex) {
    let priceField = document.getElementById(arrayIndex);
    priceField.innerHTML = '';
    let result = sum * sellPrice;
    priceField.innerHTML = result;

}

function setSum() {
    let sumOfPrice = document.getElementById('sum-of-price');
    if (sumOfItems < 0) {
        sumOfItems = 0;
    }
    sumOfPrice.innerHTML = sumOfItems;
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

module.exports.tambah = tambah;
module.exports.kurang = kurang;