const { ipcRenderer } = require('electron');
const inputSection = require('../../assets/main');

const btnStart = document.getElementById('btn-inventory-start');
const btnAddItem = document.getElementById('btn-add-item');
let container = document.getElementById('inventory-table-items');
let monthYear = {};

container.innerHTML = '';
btnStart.innerHTML = 'Mulai';

// Check empty object of month and year
if (Object.keys(monthYear).length < 1) {
  btnAddItem.disabled = true;
}

btnAddItem.addEventListener('click', () => {
  inputSection.handleInputTrigger('input-inventory');
  ipcRenderer.send('month-year-input-inventory', monthYear);
});

btnStart.addEventListener('click', () => {
  const month = document.getElementById('month-period').value;
  const year = document.getElementById('year-period').value;
  const data = {
    month,
    year
  };
  btnAddItem.disabled = false;
  ipcRenderer.send('inventory-start', data);
});

ipcRenderer.on('list-items-inventory', (event, result, data) => {
  monthYear = data;
  let number = 1;
  let htmlReady = '';
  container.innerHTML = '';
  if (result.length > 0) {
    result.forEach(res => {
      htmlReady += `<tr>
      <td>${number}</td>
      <td>${res.name}</td>
      <td>${res.quantity} ${res.unit}</td>
      <td>${res.buyPrice}</td>
      <td>${res.sellPrice}</td>
      <td>
        <button onclick="editItem('${res._id}')" class="btn btn-info">Sunting</button>
        <button onclick="deleteItem('${res._id}')" class="btn btn-danger">Hapus</button>
      </td>
      </tr>`
      number++;
    });
  } else {
    htmlReady += `<tr>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    </tr>`
  }
  container.innerHTML = htmlReady;
  btnStart.innerHTML = 'Ubah';
});

function editItem(itemId) {
  console.log('Edit Item');
  ipcRenderer.send('edit-item');
}

function deleteItem(itemId) {
  console.log('Delete Item');
  ipcRenderer.send('delete-item');
}

function inventoryLoad() {
  const date = new Date();
  const currentMonthNumber = date.getMonth();
  const currentYear = date.getFullYear();

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
    'Oktober', 'November', 'Desember'];

  //const years = () => Array.from(length: 5);

  const currentMonth = months[currentMonthNumber];
  document.getElementById("month-period").setAttribute("value", currentMonth);
  document.getElementById("year-period").setAttribute("value", currentYear);

  const monthsElement = document.getElementById("month-list");
  months.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    monthsElement.appendChild(option);
  });
}

inventoryLoad();