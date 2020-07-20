const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnFinalReport = document.getElementById('final-report');
const btnProfitLossReport = document.getElementById('profit-loss-report');
let dateReportField = document.getElementById('datepick-report')

btnFinalReport.addEventListener('click', (e) => {
    let datepick = dateReportField.value.split("-");
    let year = datepick[0];
    let oldMonth = datepick[1];
    let date = datepick[2];
    let month = getMonth(oldMonth);

    ipcRenderer.send('final-report', { date, month, year, oldMonth });
    inputSection.handleInputTrigger('final-report');
});

function getMonth(month) {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
        'Oktober', 'November', 'Desember'];
    let newMonth = months[Number(month) - 1];
    return newMonth
};