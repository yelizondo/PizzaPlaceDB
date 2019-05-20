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
            resTamannos: result.todosLosTamannosPizza
        });
    });
});

router.post('/iniciarCreacion', (req, res) => 
{
    var bodySaborizacion = req.body.saborizaciones;
    var bodyTamannos = req.body.tamannos;
    var bodyCantSabores = req.body.chooseone;

    if (bodyCantSabores === "UnSaborEspecial")
    {
        res.redirect('/UnSaborFinal?tamanno='+
        bodyTamannos +'&saborizacion=' +
        bodySaborizacion + "&tipoPizza=unSabor");
    }
    else
    {
        res.redirect('/DosSaboresFinal?tamanno=' +
        bodyTamannos +'&saborizacion=' +
        bodySaborizacion + "&tipoPizza=dosSabores");
    }
});

module.exports = router;