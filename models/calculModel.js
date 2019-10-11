let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let dbUrl = 'mongodb://localhost:27017/calcul';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
let calculSchema = mongoose.Schema({
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

let Calcul = mongoose.model('Calcul', calculSchema);
module.exports = Calcul;