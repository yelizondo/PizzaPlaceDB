var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

router.get('/', function(req, res, next) 
{
    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todasLasPizzas,"Descripcion"],
        [dbcon.todosLosIngredientes, "DESCRIPCION"]
    ], (result) => {
        res.render('UnSaborFinal', {
            title: 'Seleccionar Pizza',
            style: 'UnSaborFinal.css',
            resPizzas: result.todasLasPizzas,
            resIngredientes: result.todosLosIngredientes  
        });
    });
});

module.exports = router;