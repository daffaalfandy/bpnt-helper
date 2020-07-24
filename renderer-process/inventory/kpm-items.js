const inputSection = require('../../assets/main');

const btnInventoryStart = document.getElementById('btn-items');
const btnKpmStart = document.getElementById('btn-kpm');

btnInventoryStart.addEventListener('click', () => {
    inputSection.handleInputTrigger('inventory');
});

btnKpmStart.addEventListener('click', () => {
    inputSection.handleInputTrigger('kpm-data');
});