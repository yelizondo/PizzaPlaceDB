/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

/* GET users listing. */
router.get('/', function(req, res, next)
{
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        dtCPM.getStoredProcs([
            [dbcon.todosLosIngredientes,"DESCRIPCION"],
            [dbcon.todosLosTamannosPizza, "Descripcion"]
        ], (result) => {

            res.render('Mantenimiento', {
                title: 'Mantenimiento',
                style: 'Mantenimiento.css',
                resIngredientes: result.todosLosIngredientes,
                resTamannos: result.todosLosTamannosPizza
            });
        });
    }
});


router.post('/CreateSpecialPizza', (req, res, next) => {
    var body = req.body;
    var nuevaPizza = {};
    var preciosXTamanno = [];
    var ingredientes = [];

    // Ugly code
    nuevaPizza.nombre = body.Nombre;
    delete body.Nombre

    preciosXTamanno.push({tamanno: 'Pequeña', precio: body.Pequeña});
    delete body.Pequeña

    preciosXTamanno.push({tamanno: 'Mediana', precio: body.Mediana});
    delete body.Mediana

    preciosXTamanno.push({tamanno: 'Grande', precio: body.Grande});
    delete body.Grande

    preciosXTamanno.push({tamanno: 'Extra Grande', precio: body['Extra Grande']});
    delete body['Extra Grande']

    preciosXTamanno.push({tamanno: 'Fiestera', precio: body.Fiestera});
    delete body.Fiestera

    // End of Ugly code

    delete body.Add

    for (var key in body)
    {
        ingredientes.push(key);
    }

    nuevaPizza.ingredientes = ingredientes;
    nuevaPizza.preciosXTamanno = preciosXTamanno;

    dbcon.insertNewPizza(nuevaPizza, (result) =>
    {
        res.redirect('/Mantenimiento');
    });
});

module.exports = router;
