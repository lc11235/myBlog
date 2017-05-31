const mongoose = require('mongoose');
const config = require('../config/config.js');
const Models = require('./model.js');

mongoose.connect(config.mongodb);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('Database connection error: ' + err);
});

db.on('open', () => {
    console.log('The database has connected.');
});

module.exports = Models;