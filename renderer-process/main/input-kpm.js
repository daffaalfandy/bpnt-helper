const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

let btnInput = document.getElementById('btn-input-kpm');
let empty = false;
let kksNum = [];

ipcRenderer.on('res-kks', (event, result) => {
    for (i = 1; i < 5; i++) {
        document.getElementById(`kks-num-${i}`).value = result[i - 1];
    };
    kksNum = result;
});

btnInput.addEventListener('click', () => {
    let name = document.getElementById('kpm-name').value;
    let dusun = document.getElementById('kpm-address-dusun').value;
    let rt = document.getElementById('kpm-address-rt').value;
    let village = document.getElementById('kpm-address-village').value;
    let district = document.getElementById('kpm-address-district').value;
    let kks = '';
    if (empty) {
        for (i = 1; i < 5; i++) {
            kks += document.getElementById(`kks-num-${i}`).value;
        };
    } else {
        for (i = 0; i < 4; i++) {
            kks += kksNum[i];
        }
    }
    let data = {
        kks,
        name,
        dusun,
        rt,
        village,
        district,
    }
    if (empty) {
        ipcRenderer.send('kpm-data-input-inventory', data);
        ipcRenderer.send('list-all-kpm');
        clearField();
        inputSection.handleInputTrigger('kpm-data');
    } else {
        ipcRenderer.send('kpm-data-input', data);
        clearField();
        inputSection.handleInputTrigger('transaction');
    }
});

ipcRenderer.on('confirm-input-kpm-from-inventory', (event) => {
    for (i = 1; i < 5; i++) {
        if (i == 1) {
            document.getElementById(`kks-num-${i}`).value = '1946';
        }
        if (i == 2) {
            document.getElementById(`kks-num-${i}`).value = '9000';
        }
        document.getElementById(`kks-num-${i}`).disabled = false;
    };
    btnInput.innerHTML = 'Simpan';
    empty = true;
});

document.body.addEventListener('click', (event) => {
    if (event.target.dataset.section) {
        clearField();
    }
})

function clearField() {
    for (i = 1; i < 5; i++) {
        document.getElementById(`kks-num-${i}`).value = '';
        document.getElementById(`kks-num-${i}`).disabled = true;
    }
    empty = false;
    document.getElementById('kpm-name').value = '';
    document.getElementById('kpm-address-dusun').value = '';
    document.getElementById('kpm-address-rt').value = '';
    document.getElementById('kpm-address-village').value = '';
    document.getElementById('kpm-address-district').value = '';
    btnInput.innerHTML = 'Mulai'
    kksNum = [];
}