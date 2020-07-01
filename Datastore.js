const Datastore = require('nedb');
const db = {};

db.dataKpm = new Datastore({
    filename: 'kpm-data.db',
    autoload: true,
    timestampData: true
});

db.dataBarang = new Datastore({
    filename: 'items-data.db',
    autoload: true,
    timestampData: true
});

db.transaksi = new Datastore({
    filename: 'transaction-data.db',
    autoload: true,
    timestampData: true
});