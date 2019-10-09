const router = require("express").Router();

const calcul = require('../controllers/calculController');

router.get('/', calcul.list);
router.post('/calculate', calcul.save);


module.exports = router;