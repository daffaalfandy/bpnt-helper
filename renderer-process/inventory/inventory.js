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

const formEdit = (state) => `<div class=container>
<div class="form-group row">
  <label for="item-name-${state}" class="col-sm-4 my-auto">Nama Barang</label>
  <div class="col">
    <input type="text" id="item-name-${state}" class="form-control" />
  </div>
</div>
<div class="form-group row">
  <label for="item-buyprice-${state}" class="col-sm-4 my-auto">Harga Beli</label>
  <div class="col">
    <input type="text" id="item-buy-price"-${state} class="form-control" />
  </div>
</div>
<div class="form-group row">
  <label for="item-sellprice-${state}" class="col-sm-4 my-auto">Harga Jual</label>
  <div class="col">
    <input type="text" id="item-sellprice-${state}" class="form-control" />
  </div>
</div>
<div class="form-group row">
<label for="item-qty-${state}" class="col-sm-4 my-auto">Banyak Barang</label>
<div class="col-sm-4">
  <input type="text" id="item-qty-${state}" class="form-control" />
</div>
</div>`;

const btnCloseModal = `<button type="button" class="close" data-dismiss="modal" aria-label="Tutup">
<span aria-hidden-"true">&times;</span>
</button>`;


function initializeModal(action, id) {
  const modal = new BSN.Modal(document.getElementById("inventory-modal"));
  modal.show();
  showModalContent(action, id)
}

function showModalContent(action, id) {
  switch (action) {
    case "add":
      setModalHeader("Tambah");
      setModalBodyAdd();
      setModalButtonAdd();
      break;
    case "edit":
      setModalHeader("Sunting");
      setModalBodyEdit(id);
      setModalButtonEdit(action, id);
      break;
    case "delete":
      setModalHeader("Hapus");
      setModalBodyDelete();
      setModalButtonDelete(id);
      break;
  }
}

function setModalHeader(title) {
  document.querySelector("#inventory-modal .modal-header").innerHTML = `<h4 class="modal-title">${title} Barang</h4> ${btnCloseModal}`;
}

function setModalBodyEdit(id) {
  document.querySelector("#inventory-modal .modal-body").innerHTML = formEdit("edit-" + id);
}

function setModalBodyAdd() {
  document.querySelector("#inventory-modal .modal-body").innerHTML = formEdit("add");
}

function setModalBodyDelete() {
  document.querySelector("#inventory-modal .modal-body").innerHTML = "<p class='text-white'>Yakin untuk menghapus?</p>";
}

function setModalButtonDelete(id) {
  document.querySelector("#inventory-modal .modal-footer .float-right").innerHTML = `<button class="btn btn-danger" data-dismiss="modal">Tidak</button>
            <button class="btn btn-primary" id="btn-confirm-delete-${id}">Ya</button>`;
}

function setModalButtonEdit(id) {
  document.querySelector("#inventory-modal .modal-footer .float-right").innerHTML = `<button class="btn btn-danger" data-dismiss="modal">Batal</button>
  <button class="btn btn-primary" id="btn-confirm-edit-${id}">Simpan</button>`;
}

function setModalButtonAdd() {
  document.querySelector("#inventory-modal .modal-footer .float-right").innerHTML = `<button class="btn btn-danger" data-dismiss="modal">Batal</button>
  <button class="btn btn-primary" id="btn-confirm-add">Simpan</button>`;
}

module.exports.initializeModal = initializeModal;