var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

router.get('/', function(req, res, next) 
{
    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todasLasSaborizaciones,"DESCRIPCION"],
        [dbcon.todosLosTamannosPizza, "Descripcion"]
    ], (result) => {
        res.render('PizzaEspecialMain', {
            title: 'Seleccionar Pizza Especial',
            style: 'PizzaEspecialMain.css',
            resSaborizaciones: result.saborizaciones,
            resTamannosPizza: result.todosLosTamannosPizza
        });
    });
});

module.exports = router;