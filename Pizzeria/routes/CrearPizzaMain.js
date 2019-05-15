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
    var saborizacion = req.body.saborizaciones;
    var tamannos = req.body.tamannos;
    var cantSabores = req.body.chooseone;


    if (cantSabores == "UnSabor")
    {
        
    }
    else
    {

    }
    console.log(saborizacion,tamannos,cantSabores);
});

module.exports = router;
