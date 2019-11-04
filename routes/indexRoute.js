const router = require("express").Router();

const calcul = require('../controllers/calculController');

router.get('/', calcul.list);
router.post('/add', calcul.save);
router.get('/calcul/:id', calcul.calcul);
router.get('/edit/:id', calcul.edit);
router.get('/technos', calcul.tech);

module.exports = router;