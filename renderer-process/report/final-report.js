const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');
const inputSection = require('../../assets/main');

// Importing BrowserWindow from Main 
const BrowserWindow = remote.BrowserWindow;

let btnBackReport = document.getElementById('btn-back-final-report');
let btnToPdf = document.getElementById('btn-final-pdf');
let titleField = document.getElementById('final-title');
let finalTableField = document.getElementById('final-report-table');
let alertPdf = document.getElementById('alert-final');
let datePDF = {};

ipcRenderer.on('final-report-data', (event, items) => {
    datePDF = { month: items[0].month, year: items[0].year };
    titleField.innerHTML = `Toko Hari, ${items[0].month} ${items[0].year}`;
    let htmlResult = '';
    if (items.length > 0) {
        items.forEach((item, index) => {
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${(item.sumOfQuantity - item.quantity).toLocaleString('id')} ${item.unit}</td>
            </tr>`
        })
    } else {
        htmlResult += `<tr><td>-</td><td>-</td><td>-</td></tr>`
    }
    finalTableField.innerHTML = htmlResult;
});

btnBackReport.addEventListener('click', (e) => {
    titleField.innerHTML = '';
    finalTableField.innerHTML = '';
    alertPdf.style.display = 'none';
    alertPdf.innerHTML = '';
    inputSection.handleInputTrigger('report');
});

// Convert to PDF

btnToPdf.addEventListener('click', (event) => {
    // let filepath1 = path.join(__dirname, `../../laporan/laporan-akhir-${datePDF.month}-${datePDF.year}.pdf`);
    let filepath1 = `laporan/laporan-akhir-${datePDF.month}-${datePDF.year}.pdf`;

    let options = {
        marginsType: 0,
        pageSize: 'A4',
        printBackground: true,
        printSelectionOnly: false,
        landscape: false
    }

    document.body.style.backgroundColor = '#fff'
    document.getElementById('main-sidenav').style.visibility = 'hidden';
    btnBackReport.style.display = 'none';
    btnToPdf.style.display = 'none';
    // let win = BrowserWindow.getAllWindows()[0]; 
    let win = BrowserWindow.getFocusedWindow();

    win.webContents.printToPDF(options).then(data => {
        fs.writeFile(filepath1, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                document.body.style.backgroundColor = '#161E37';
                document.getElementById('main-sidenav').style.visibility = 'visible';
                btnBackReport.style.display = 'inline';
                btnToPdf.style.display = 'inline';
                alertPdf.style.display = 'block';
                alertPdf.innerHTML = `File berhasil dibuat ${filepath1}`;
            }
        });
    }).catch(error => {
        console.log(error)
    });
}); 