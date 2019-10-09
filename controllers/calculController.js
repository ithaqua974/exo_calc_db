let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let calculSchema = new Schema({
    chiffre1: Number,
    chiffre2: Number,
    signe: String,
    résultat: Number,
    actif: {
        type: Boolean,
        default: 1
    },

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
            console.log(calculs);
            res.render("index", {
                calcul: calculs

            });
        });
    });
    // var resultat = '0';
    // var calc = 'calcul';
    // res.render('index', {
    //     resultat: resultat,
    //     calcul: calcul,
    // });
};
//fonction pour la calculatrice
controller.save = (req, res) => {
    //
    try {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {

            let calculAjout = new Calcul({
                //chiffre1: 10,
                chiffre1: req.body.chiffre1,
                signe: '+',
                signe: req.body.signe,
                //chiffre2: 5,
                chiffre2: req.body.chiffre2,
                résultat: req.body.resultat,
                actif: 1,
            })

            calculAjout.save((err) => {
                if (err) throw err;
                console.log('Calcul Ajouté');
            })

        });
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
    res.redirect('/');

    // tesg pour voir si la variable résultat retourne bien le résultat du calcul
    console.log(resultat)
    // rendu de la vue avec la variable résultat
    res.render('index', {
        calcul: calcul,
        resultat: resultat,
    });
};

function calculate() {
    var chiffre1 = calcul.chiffre1;
    var chiffre2 = calcul.chiffre2;
    var resultat;
    var operation = calcul.chiffre1 + calculy.signe + calcul.chiffre2;

    // switch qui permet de definir les actions en fonction que quel button radio est coché dans la vie
    switch (calcul.signe) {
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
};

module.exports = controller;