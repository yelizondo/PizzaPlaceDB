/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var saborizaciones = ["Escoger la saborizacion"];
var tamannosPizza = ["Escoger el tamaño"];

router.get('/', function(req, res, next)
{
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        dtCPM.getStoredProcs([
            [dbcon.todasLasSaborizaciones,"DESCRIPCION"],
            [dbcon.todosLosTamannosPizza, "Descripcion"]
        ], (result) => {
            res.render('CrearPizzaMain', {
                title: 'Crear Pizza',
                style: 'styles.css',
                resSaborizaciones: result.saborizaciones,
                resTamannos: result.todosLosTamannosPizza
            });
        });
    }
});

router.post('/iniciarCreacion', (req, res) =>
{
    var bodySaborizacion = req.body.saborizaciones;
    var bodyTamannos = req.body.tamannos;
    var bodyCantSabores = req.body.chooseone;
    var orderType;

    if (bodyCantSabores === "UnSabor")
    {
        orderType = "UnSabor";
        res.redirect('/CrearUnSaborFinal?tamanno='+ bodyTamannos +
        '&saborizacion=' + bodySaborizacion +
        "&tipoPizza=" + orderType);
    }
    else
    {
        orderType = "DosSabores";
        res.redirect('/CrearPrimeraMitad?tamanno=' +bodyTamannos +
        '&saborizacion=' + bodySaborizacion +
        "&tipoPizza=" + orderType);
    }
});

module.exports = router;
