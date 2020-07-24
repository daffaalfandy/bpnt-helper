const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnInventoryStart = document.getElementById('btn-items');
const btnKpmStart = document.getElementById('btn-kpm');

btnInventoryStart.addEventListener('click', () => {
    inputSection.handleInputTrigger('inventory');
});

btnKpmStart.addEventListener('click', () => {
    ipcRenderer.send('list-all-kpm');
    inputSection.handleInputTrigger('kpm-data');
});