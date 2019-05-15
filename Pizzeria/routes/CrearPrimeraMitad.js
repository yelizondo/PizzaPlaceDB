var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('CrearPrimeraMitad', {
        title: 'Crear Pizza',
        style: 'CrearPrimeraMitad.css'
    });
});

module.exports = router;