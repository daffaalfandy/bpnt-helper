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

function insertOneKPM(data) {
    db.kpmData.insert(data, (err, newDoc) => {
    });
}

async function searchOneKPM(key, value) {
    return new Promise((res, rej) => {
        db.kpmData.findOne({ [key]: value }, (err, data) => {
            if (data == null) {
                res(false)
            } else {
                res(data)
            }
        })
    })
}

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

module.exports.insertOneKPM = insertOneKPM;
module.exports.searchOneKPM = searchOneKPM;
module.exports.searchAllItems = searchAllItems;