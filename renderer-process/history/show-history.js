const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let itemsHistoryField = document.getElementById('history-table');
let btnKpmSearch = document.getElementById('btn-kpm-search');
let dateHistoryField = document.getElementById('show-date-history');
let oldData = [];

ipcRenderer.on('transaction-history-data', (event, items, datetime) => {
    dateHistoryField.innerHTML = `${datetime.date}  ${datetime.month}  ${datetime.year}`;
    oldData = [...items];
    itemsHistoryField.innerHTML = '';
    let result = '';
    let index = 0;
    if (oldData.length > 0) {
        oldData.forEach(item => {
            result += `<tr>
            <td>${index + 1}</td>
            <td>${splitKKS(item.kks)}</td>
            <td>${item.name}</td>
            <td><button id="btn-history-detail" data-id="${item._id}" class="btn btn-info">Detail Transaksi</button></td>
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
});

btnKpmSearch.addEventListener('click', (event) => {
    let htmlResult = '';
    let kksSearchValue = '';
    for (var i = 1; i <= 2; i++) {
        kksSearchValue += document.getElementById(`kks-search-${i}`).value;
    }
    if (kksSearchValue != '') {
        for (var i = 0; i < oldData.length; i++) {
            if (kksSearchValue == oldData[i].kks.substring(8)) {
                htmlResult += `<tr>
                <td>${i + 1}</td>
                <td>${splitKKS(oldData[i].kks)}</td>
                <td>${oldData[i].name}</td>
                <td><button id="btn-history-detail" data-id="${oldData[i]._id}" class="btn btn-info">Detail Transaksi</button></td>
                </tr>`
            }
        }
        if (htmlResult == '') {
            itemsHistoryField.innerHTML = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
        } else {
            itemsHistoryField.innerHTML = htmlResult;
        }
    } else {
        let index = 0;
        oldData.forEach(item => {
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${splitKKS(item.kks)}</td>
            <td>${item.name}</td>
            <td><button id="btn-history-detail" data-id="${item._id}" class="btn btn-info">Detail Transaksi</button></td>
            </tr>`
            index++;
        });
        itemsHistoryField.innerHTML = htmlResult;
    }
});

function _changeFocus(currentIndex, dest) {
    let intIndex = parseInt(currentIndex);
    if (dest === "next") {
        intIndex += 1;
    } else {
        intIndex -= 1;
    }
    const nextElement = document.getElementById(`kks-search-${intIndex}`);
    nextElement.focus();
}

function _onKKSKeyUpEvent(currentIndex, event) {
    const inputKKSNumber = document.getElementById(`kks-search-${currentIndex}`);
    const inputLength = inputKKSNumber.value.length;
    if (inputLength === 4) {
        if (currentIndex < 2) {
            _changeFocus(currentIndex, "next");
        }
    }
    if (inputLength === 0) {
        if (event.keyCode === 8) {
            if (currentIndex > 1) {
                _changeFocus(currentIndex, "before");
            }
        }
    }
}
function watchKKSEvent() {
    for (let i = 1; i <= 2; i++) {
        document.getElementById(`kks-search-${i}`).addEventListener("keyup", (e) => {
            _onKKSKeyUpEvent(i, e);
        });
        document.getElementById(`kks-search-${i}`).addEventListener("click", e => {
            document.getElementById(`kks-search-${i}`).select();
        })
    }
}

watchKKSEvent();