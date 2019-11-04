let mongoose = require('mongoose');
let Calcul = require('../models/calculModel.js');

// const Calcul = mongoose.model('Calcul', calculSchema);

let dbUrl = 'mongodb://localhost:27017/calcul';
const db = mongoose.connection;

const controller = {};

controller.tech = (req, res) => {
    res.render("technos")
}
//route pour afficher la vue index en passant la variable résultat de l'appli à la vue
controller.list = (req, res) => {
    Calcul.find(function (err, calculs) {
        if (err) throw err;
        res.render("index", {
            calcul: calculs

        });
    });


};
//fonction pour la calculatrice
controller.save = (req, res) => {
    try {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {

            let calculAjout = new Calcul({
                chiffre1: req.body.chiffre1,
                signe: req.body.signe,
                chiffre2: req.body.chiffre2,
                résultat: req.body.resultat,
            });

            calculAjout.save((err) => {
                if (err) throw err;
                res.redirect('/');
            })

        });
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }




    // rendu de la vue avec la variable résultat

};
controller.calcul = (req, res) => {
    Calcul.findById(req.params.id, function (err, calcul) {
        if (err) throw err;
        if (calcul) {
            résultat = calculate(calcul.chiffre1, calcul.chiffre2, calcul.signe);
            Calcul.findByIdAndUpdate(req.params.id, {
                    résultat: résultat
                },
                function (err) {
                    if (err) throw err;
                    res.redirect('/');
                }
            )
        };
    })

}


function calculate(chiffre1, chiffre2, signe) {

    var resultat;
    // var operation = calcul.chiffre1 + calcul.signe + calcul.chiffre2;

    // switch qui permet de definir les actions en fonction que quel button radio est coché dans la vie
    switch (signe) {
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
    };
    return resultat;
};
controller.edit = (req, res) => {

    Calcul.findById(req.params.id, function (err, calcul) {
        console.log(calcul);
        if (err) throw err;
        if (calcul) {
            Calcul.find(function (err, calculs) {
                if (err) throw err;
                res.render("index", {
                    calcul: calculs,
                    dbCalcul: calcul
                });

            });
        }
    })
};
controller.update = (req, res) => {
    console.log(req.param);
    // Calcul.findById(req.param.id, )

};

module.exports = controller;