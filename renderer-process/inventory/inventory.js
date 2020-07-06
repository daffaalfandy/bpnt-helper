const { ipcRenderer } = require('electron');

const btnStart = document.getElementById('btn-inventory-start');

btnStart.addEventListener('click', () => {
    const month = document.getElementById('month-period').value;
    const year = document.getElementById('year-period').value;
    const data = {
        month,
        year
    };
    ipcRenderer.send('inventory-start', data);
});

ipcRenderer.on('list-items-inventory', (event, data) => {
    btnStart.innerHTML = 'Ubah';
});