var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var saborizaciones = ["Escoger la saborizacion"];
var tamannosPizza = ["Escoger el tamaño"];

router.get('/', function(req, res, next) 
{
    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todasLasSaborizaciones,"DESCRIPCION"],
        [dbcon.todosLosTamannosPizza, "Descripcion"]
    ], (result) => {
        res.render('CrearPizzaMain', {
            title: 'Crear Pizza',
            style: 'CrearPizzaMain.css',
            resSaborizaciones: result.saborizaciones,
            resTamannos: result.todosLosTamannosPizza
        });
    });
});

router.post('/', (req, res) => {

});

module.exports = router;
