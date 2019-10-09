let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let calculSchema = new Schema({
    chiffre1: Number,
    chiffre2: Number,
    signe: String,
    résultat: Number,
    actif: Boolean,

});

const Calcul = mongoose.model('Calcul', calculSchema);

let dbUrl = 'mongodb://localhost:27017/calcul';
const db = mongoose.connection;

const controller = {};


//route pour afficher la vue index en passant la variable résultat de l'appli à la vue
controller.list = (req, res) => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Controller LIST");

        Calcul.find(function (err, calculs) {
            if (err) throw err;
            res.render("index", {
                calcul: calculs
            });
        });
    });
    var resultat = '0';
    var calcul = 'calcul';
    res.render('index', {
        resultat: resultat,
        calcul: calcul,
    });
};
//fonction pour la calculatrice
controller.save = (req, res) => {
    var chiffre1 = Number(req.body.chiffre1);
    var chiffre2 = Number(req.body.chiffre2);
    var resultat;
    var calcul = req.body.chiffre1 + req.body.signe + req.body.chiffre2;

    // switch qui permet de definir les actions en fonction que quel button radio est coché dans la vie
    switch (req.body.signe) {
        case "+":

            resultat = chiffre1 + chiffre2;
            break;
        case "-":
            resultat = chiffre1 - chiffre2;
            break;
        case "*":
            resultat = chiffre1 * chiffre2;
            break;
        case "/":
            resultat = chiffre1 / chiffre2;
            break;
        default:
            resultat = "veuillez sélectionner un opérateur";
            break;
    }

    // tesg pour voir si la variable résultat retourne bien le résultat du calcul
    console.log(resultat)
    // rendu de la vue avec la variable résultat
    res.render('index', {
        calcul: calcul,
        resultat: resultat,
    });
};

module.exports = controller;