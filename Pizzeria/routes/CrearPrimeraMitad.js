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

router.get('/', function(req, res, next)
{
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        if (Object.entries(pizzaEnConstruccion).length === 0 && pizzaEnConstruccion.constructor === Object)
        {
            pizzaEnConstruccion.tamanno = req.query.tamanno;
            pizzaEnConstruccion.saborizacion = req.query.saborizacion;
            pizzaEnConstruccion.tipoPizza = req.query.tipoPizza;
        }

        dtCPM.getStoredProcs([
            [dbcon.todosLosIngredientes, "DESCRIPCION"]
        ], (result) => {
            res.render('CrearPrimeraMitad', {
                title: 'Crear Pizza',
                style: 'CrearPrimeraMitad.css',
                resIngredientes: result.todosLosIngredientes
            });
        });
    }
});

router.post('/readyFirst', (req, res, next) => {
    var items = "";

    console.log(req.body);

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

    pizzaEnConstruccion.ingredientesP1 = listIng;

    res.redirect('/CrearSegundaMitad?order=' + JSON.stringify(pizzaEnConstruccion));
});

module.exports = router;
