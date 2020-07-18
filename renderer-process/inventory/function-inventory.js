function editItem(itemId) {
    ipcRenderer.send('edit-item', itemId);
}

function deleteItem(itemId) {
    ipcRenderer.send('delete-item', itemId);
}