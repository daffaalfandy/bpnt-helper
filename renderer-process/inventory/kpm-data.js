const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let kpmDataTableField = document.getElementById('kpm-table');
let btnKpmDataSearch = document.getElementById('btn-kpm-data-search');
let btnAddKpmData = document.getElementById('btn-add-kpm-data');
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

btnKpmDataSearch.addEventListener('click', (event) => {
    let htmlResult = '';
    let kksSearchValue = '';
    for (var i = 1; i <= 2; i++) {
        kksSearchValue += document.getElementById(`kks-data-search-${i}`).value;
    }
    if (kksSearchValue != '') {
        for (var i = 0; i < oldKpmData.length; i++) {
            if (kksSearchValue == oldKpmData[i].kks.substring(8)) {
                htmlResult += `<tr>
                <td>${i + 1}</td>
                <td>${splitKKS(oldKpmData[i].kks)}</td>
                <td>${oldKpmData[i].name}</td>
                <td>${oldKpmData[i].dusun} RT${oldKpmData[i].rt} ${oldKpmData[i].village} ${oldKpmData[i].district} Bantul</td>
                </tr>`
            }
        }
        if (htmlResult == '') {
            kpmDataTableField.innerHTML = '<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>';
        } else {
            kpmDataTableField.innerHTML = htmlResult;
        }
    } else {
        let index = 0;
        oldKpmData.forEach(item => {
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${splitKKS(item.kks)}</td>
            <td>${item.name}</td>
            <td>${item.dusun} RT${item.rt} ${item.village} ${item.district} Bantul</td>
            </tr>`
        });
        kpmDataTableField.innerHTML = htmlResult;
    }
})

function _changeFocus(currentIndex, dest) {
    let intIndex = parseInt(currentIndex);
    if (dest === "next") {
        intIndex += 1;
    } else {
        intIndex -= 1;
    }
    const nextElement = document.getElementById(`kks-data-search-${intIndex}`);
    nextElement.focus();
}

function _onKKSKeyUpEvent(currentIndex, event) {
    const inputKKSNumber = document.getElementById(`kks-data-search-${currentIndex}`);
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
        document.getElementById(`kks-data-search-${i}`).addEventListener("keyup", (e) => {
            _onKKSKeyUpEvent(i, e);
        });
        document.getElementById(`kks-data-search-${i}`).addEventListener("click", e => {
            document.getElementById(`kks-data-search-${i}`).select();
        })
    }
}

watchKKSEvent();

btnAddKpmData.addEventListener('click', (e) => {
    ipcRenderer.send('input-kpm-from-inventory');
    inputSection.handleInputTrigger('input-kpm');
});