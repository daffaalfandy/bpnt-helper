const { ipcRenderer, ipcMain } = require('electron');
const inputSection = require('../../assets/main');

const btnStartHistory = document.getElementById('btn-start-history');
let datePickField = document.getElementById('datepick-history');

btnStartHistory.addEventListener('click', (e) => {
    let datepick = datePickField.value.split("-");
    let year = datepick[0];
    let month = datepick[1];
    let date = datepick[2];
    let data = {
        dateTimeData: {
            date,
            month,
            year
        }
    }

    ipcRenderer.send('transaction-history', data);

    inputSection.handleInputTrigger('show-history');
});