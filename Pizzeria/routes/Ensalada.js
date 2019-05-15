var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

router.get('/', function(req, res, next) 
{
    dtCPM.getStoredProcs([
        [dbcon.todasLasEnsaladas,"Descripcion"],
        [dbcon.todosLosTamannosEnsalada, "Descripcion"],
        [dbcon.todasLasVinagretas, "Descripcion"]
    ], (result) => {
        console.log(result);
        res.render('Ensalada', {
            title: 'Seleccionar Ensalada',
            style: 'Ensalada.css',
            resEnsaladas: result.todasLasEnsaladas,
            resTamannosEnsalada: result.todosLostamannosEnsalada,
            resVinagretas: result.todasLasVinagretas
        });
    });
});

module.exports = router;