var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('CrearUnSaborFinal', {
        title: 'Crear Pizza',
        style: 'CrearUnSaborFinal.css'
    });
});

module.exports = router;