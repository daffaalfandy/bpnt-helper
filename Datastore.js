const Datastore = require('nedb');
const db = {};

db.kpmData = new Datastore({
    filename: 'kpm-data.db',
    autoload: true,
    timestampData: true
});

db.itemsData = new Datastore({
    filename: 'items-data.db',
    autoload: true,
    timestampData: true
});

db.transactionData = new Datastore({
    filename: 'transaction-data.db',
    autoload: true,
    timestampData: true
});

// KPM Function

function insertOneKPM(data) {
    db.kpmData.insert(data, (err, newDoc) => {
    });
}

async function searchOneKPM(key, value) {
    return new Promise((res, rej) => {
        db.kpmData.findOne({ [key]: value }, (err, data) => {
            if (data == null) {
                res(false);
            } else {
                res(data);
            }
        })
    })
}

// Data Function

async function searchAllItems(data) {
    return new Promise((res, rej) => {
        db.itemsData
            .find(data)
            .sort({ createdAt: -1 })
            .exec((err, doc) => {
                res(doc);
            });
    });
};

async function searchItem(itemId) {
    return new Promise((res, rej) => {
        db.itemsData.findOne(itemId, (err, doc) => {
            res(doc);
        });
    });
}

async function deleteItem(itemId) {
    return new Promise((res, rej) => {
        db.itemsData.remove(itemId, (err) => {
            db.itemsData.persistence.compactDatafile();
        })
    })
}

function insertItem(data) {
    db.itemsData.insert(data);
}

function updateItem(itemId, data) {
    db.itemsData.update({ _id: itemId }, { $set: data }, {}, function (err, numReplaced) {
        db.itemsData.persistence.compactDatafile();
    })
}

// Transaction Function

function insertTransaction(data) {
    db.transactionData.insert(data);
}

async function searchTransaction(data) {
    return new Promise((res, rej) => {
        db.transactionData
            .find(data)
            .sort({ createdAt: -1 })
            .exec((err, doc) => {
                res(doc);
            });
    });
}

async function searchOneTransaction(data) {
    return new Promise((res, rej) => {
        db.transactionData.findOne(data, (err, data) => {
            if (data == null) {
                res(false);
            } else {
                res(data);
            }
        })
    })
}

module.exports.insertOneKPM = insertOneKPM;
module.exports.searchOneKPM = searchOneKPM;
module.exports.searchAllItems = searchAllItems;
module.exports.insertItem = insertItem;
module.exports.searchItem = searchItem;
module.exports.deleteItem = deleteItem;
module.exports.insertTransaction = insertTransaction;
module.exports.updateItem = updateItem;
module.exports.searchTransaction = searchTransaction;
module.exports.searchOneTransaction = searchOneTransaction;