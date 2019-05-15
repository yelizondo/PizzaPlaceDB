var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('CrearSegundaMitad', {
        title: 'Crear Pizza',
        style: 'CrearSegundaMitad.css'
    });
});

module.exports = router;