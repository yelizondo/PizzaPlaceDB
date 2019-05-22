/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var pizzaEnConstruccion = {};

function cleanIng(ing)
{
    return ing.split('-',2)[1];
}

router.get('/', function(req, res, next) {
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        pizzaEnConstruccion.tamanno = req.query.tamanno;
        pizzaEnConstruccion.saborizacion = req.query.saborizacion;
        pizzaEnConstruccion.tipoOrden = req.query.tipoOrden;

        // Query todas las saborizaciones
        dtCPM.getStoredProcs([
            [dbcon.todosLosIngredientes, "DESCRIPCION"]
        ], (result) => {
            res.render('CrearUnSaborFinal', {
                title: 'Crear Pizza',
                style: 'styles.css',
                resIngredientes: result.todosLosIngredientes
            });
        });
    }
});

router.post('/finalizarUnSabor', (req, res, next) => {

    var listIng = [];

    for (var key in req.body)
    {
        var ing = {};

        if (key !== 'cantidad' && key !== 'addToCart')
        {
            if (key[0] === 'a')
            {
                ing.name = cleanIng(key);
                ing.extra = false;
                listIng.push(ing);
            }
            else if (key[0] === 'e')
            {
                let obj = listIng.find((o, i) =>
                {
                    if (o.name === cleanIng(key))
                    {
                        listIng[i] = { name: cleanIng(key), extra: true };
                    }
                });
            }
        }
    }
    pizzaEnConstruccion.tipo = 'Pizza Personalizada';
    pizzaEnConstruccion.cantidad = req.body.cantidad;
    pizzaEnConstruccion.ingredientes = listIng;

    var info = "?order=" + JSON.stringify(pizzaEnConstruccion);

    res.redirect('/dashboard/addToCart' + info);
});

module.exports = router;
