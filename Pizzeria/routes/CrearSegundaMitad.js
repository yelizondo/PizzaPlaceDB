var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

router.get('/', function(req, res, next) 
{
    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todosLosIngredientes, "DESCRIPCION"]
    ], (result) => {
        console.log(result.todosLosIngredientes);
        res.render('CrearSegundaMitad', {
            title: 'Crear Pizza',
            style: 'CrearSegundaMitad.css',
            resIngredientes: result.todosLosIngredientes
        });
    });
});

module.exports = router;