let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let livreSchema = new Schema({
    titre: String,
    date_parution: Date
});

const Livre = mongoose.model('calcul', calculSchema);

let dbUrl = 'mongodb://localhost:27017/';
const db = mongoose.connection;

const controller = {};