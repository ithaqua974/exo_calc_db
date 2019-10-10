let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let calculSchema = new Schema({
    chiffre1: Number,
    chiffre2: Number,
    signe: String,
    résultat: {
        type: Number,
        default: null,
    },
    actif: {
        type: Boolean,
        default: 1,
    },

});

module.exports = mongoose.model('Calcul', calculSchema);
// module.exports = Calcul;