const router = require("express").Router();

const calcul = require('../controllers/calculController');

router.get('/', calculController.list);
router.post('/calcul', calculController.save);

module.exports = router;