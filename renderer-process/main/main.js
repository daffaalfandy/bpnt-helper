const { ipcRenderer } = require('electron');

const btnMain = document.getElementById('btn-main');

btnMain.addEventListener('click', () => {
    let datepick = document.getElementById('datepick').value.split("-");
    let year = datepick[0];
    let month = datepick[1];
    let date = datepick[2];
    let kks = '';
    for (i = 1; i < 5; i++) {
        kks += document.getElementById(`kks-number-${i}`).value;
    };
    let data = {
        date,
        month,
        year,
        kks
    }
    ipcRenderer.send('main-start', data);
    console.log(data)
});