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
    if (pizzaEnConstruccion = JSON.parse(req.query.order))
    {
      pizzaEnConstruccion = JSON.parse(req.query.order);
    }

    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todosLosIngredientes, "DESCRIPCION"]
    ], (result) => {
        res.render('CrearSegundaMitad', {
            title: 'Crear Pizza',
            style: 'CrearSegundaMitad.css',
            resIngredientes: result.todosLosIngredientes
        });
    });
});

router.post('/readySecond', (req, res, next) => {
    var items = "";

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

    pizzaEnConstruccion.ingredientesP2 = listIng;

    res.redirect('/DosSaboresFinal?order=' + JSON.stringify(pizzaEnConstruccion));
});

module.exports = router;
