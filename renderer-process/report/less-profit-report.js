const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');
const inputSection = require('../../assets/main');

let btnBackProfit = document.getElementById('btn-back-profit-report');
let btnAddToPdfProfit = document.getElementById('btn-profit-pdf');
let profitTitleField = document.getElementById('profit-title');
let alerPdfProfit = document.getElementById('alert-profit');
let titleBuyProfitField = document.getElementById('buy-title-profit');
let itemsBuyTable = document.getElementById('items-buy-table');
let stockTable = document.getElementById('stock-field');
let summaryTable = document.getElementById('summary');
let sumOfBuyPrice = 0;
let sumOfSellPrice = 0;

ipcRenderer.on('profit-report-data', (event, items) => {
    profitTitleField.innerHTML = `Toko Hari, ${items.itemsData[0].month} ${items.itemsData[0].year}`;
    titleBuyProfitField.innerHTML = `Pembelian Komoditi BPNT ${items.itemsData[0].month} ${items.itemsData[0].year}`;

    setItemsBuyTable(items.itemsData);

    setStockTable(items.itemsData);

    setSummaryTable(items.transactionData);

});

function setItemsBuyTable(items) {
    let htmlResult = '';
    if (items.length > 0) {
        items.forEach((item, index) => {
            let sum = item.sumOfQuantity * item.buyPrice;
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.sumOfQuantity} ${item.unit}</td>
            <td>${item.buyPrice}</td>
            <td>${sum}</td>
            </tr>`
            sumOfBuyPrice += sum;
        });
        htmlResult += `<tr><td></td><td></td><td></td><td>Total </td><td>${sumOfBuyPrice}</td></tr>`
    } else {
        htmlResult += `<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`
    }
    itemsBuyTable.innerHTML = htmlResult;
}

function setStockTable(items) {
    let htmlResult = '';
    if (items.length > 0) {
        items.forEach((item, index) => {
            let sum = item.quantity * item.sellPrice;
            htmlResult += `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity} ${item.unit}</td>
            <td>${item.sellPrice}</td>
            <td>${sum}</td>
            </tr>`
            sumOfSellPrice += sum;
        });
        htmlResult += `<tr><td></td><td></td><td></td><td>Total </td><td>${sumOfSellPrice}</td></tr>`
    } else {
        htmlResult += `<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>`
    }
    stockTable.innerHTML = htmlResult;
}

function setSummaryTable(items) {
    let sumOfMoney = 0;
    for (var i = 0; i < items.length; i++) {
        sumOfMoney += items[i].totalPrice;
    }

    let profit = sumOfMoney - sumOfBuyPrice;
    let profitStatus = 'Laba';
    if (profit < 0) {
        profitStatus = 'Rugi'
        profit *= -1;
    };

    let htmlResult = '';
    if (items.length > 0) {
        htmlResult += `<tr>
        <td>Jumlah KPM </td>
        <td>${items.length}</td>
        </tr>
        <tr>
        <td>Total Uang Masuk</td>
        <td>${sumOfMoney}</td>
        </tr>
        <tr>
        <td>${profitStatus}</td>
        <td>${profit}</td>
        </tr>`
    }
    summaryTable.innerHTML = htmlResult;
}