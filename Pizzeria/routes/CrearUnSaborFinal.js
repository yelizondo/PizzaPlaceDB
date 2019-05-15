var express = require('express');
var router = express.Router();

var pizzaEnConstruccion = {};

router.get('/', function(req, res, next) {
    pizzaEnConstruccion.tamanno = req.query.tamanno;
    pizzaEnConstruccion.saborizacion = req.query.saborizacion;

    res.render('CrearUnSaborFinal', {
        title: 'Crear Pizza',
        style: 'CrearUnSaborFinal.css'
    });
});

router.post('/finalizarUnSabor', (req, res, next) => {
    var info = "?";

    

    res.redirect('/dashboard' + info);
});

module.exports = router;