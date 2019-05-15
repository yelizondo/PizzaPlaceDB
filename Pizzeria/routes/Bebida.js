var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

router.get('/', function(req, res, next) 
{
    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todasLasBebidas,"Descripcion"],
        [dbcon.todosLosTamannosBebida, "Descripcion"]
    ], (result) => {
        console.log(result);
        res.render('Bebida', {
            title: 'Seleccionar Bebida',
            style: 'Bebida.css',
            resBebidas: result.todasLasBebidas,
            resTamannoBebidas: result.todosLosTamannosBebida
        });
    });
});

module.exports = router;