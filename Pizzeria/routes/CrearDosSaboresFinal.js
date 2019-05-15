var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('CrearDosSaboresFinal', {
        title: 'Crear Pizza',
        style: 'CrearDosSaboresFinal.css'
    });
});

module.exports = router;