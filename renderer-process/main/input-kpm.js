const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnInput = document.getElementById('btn-input-kpm');
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
    for (i = 0; i < 4; i++) {
        kks += kksNum[i];
    }
    let data = {
        kks,
        name,
        dusun,
        rt,
        village,
        district,
    }
    ipcRenderer.send('kpm-data-input', data);
    clearField();
    inputSection.handleInputTrigger('transaction');
});

function clearField() {
    document.getElementById('kpm-name').value = '';
    document.getElementById('kpm-address-dusun').value = '';
    document.getElementById('kpm-address-rt').value = '';
    document.getElementById('kpm-address-village').value = '';
    document.getElementById('kpm-address-district').value = '';
}