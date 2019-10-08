let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = () => {
    let livreSchema = new Schema({
        titre: String,
        date_parution: Date
    });

    let Livre = mongoose.model('calcul', livreSchema);
}