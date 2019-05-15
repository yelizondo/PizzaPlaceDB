var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var saborizaciones = ["Escoger la saborizacion"];
var tamannosPizza = ["Escoger el tamaño"];

router.get('/', function(req, res, next) 
{
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

router.post('/iniciarCreacion', (req, res) => 
{
    var bodySaborizacion = req.body.saborizaciones;
    var bodyTamannos = req.body.tamannos;
    var bodyCantSabores = req.body.chooseone;

    if (bodyCantSabores === "UnSabor")
    {
        res.redirect('/CrearUnSaborFinal?tamanno='+
        bodyTamannos +'&saborizacion=' +
        bodySaborizacion + "&tipoPizza=unSabor");
    }
    else
    {
        res.render('CrearPrimeraMitad', {
            title: 'Crear Pizza',
            style: 'CrearPrimeraMitad.css',
            tamannos: bodyTamannos,
            saborizacion: bodySaborizacion
        });
    }
});

module.exports = router;
