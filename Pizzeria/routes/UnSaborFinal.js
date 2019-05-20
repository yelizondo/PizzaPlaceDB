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
    pizzaEnConstruccion.tamanno = req.query.tamanno;
    pizzaEnConstruccion.saborizacion = req.query.saborizacion;
    pizzaEnConstruccion.tipoPizza = req.query.tipoPizza;

    dtCPM.getStoredProcs([
        [dbcon.todasLasPizzas,"Descripcion"],
        [dbcon.todosLosIngredientes, "DESCRIPCION"]
    ], (result) => {

        if (pizzaEnConstruccion.name === "")
        {
            var ipx = [];

            for (var i = 0; i < result.todosLosIngredientes.length; i++ )
            {
                ipx.push(result.todosLosIngredientes[i])
            }

            var allIng = [];

            for (let i = 0; i < ipx.length; i++)
            {
                allIng.push({ingrediente: ipx[i], check: false});
            }

            res.render('UnSaborFinal', {
                title: 'Seleccionar Pizza',
                style: 'UnSaborFinal.css',
                resPizzas: result.todasLasPizzas,
                resIngredientes:allIng
            });
        }
        else
        {
            dbcon.ingredientesPorPizza(pizzaEnConstruccion.name, (recordset) =>
            {
                var ixp = [];

                for (var i = 0; i < recordset.recordset.length; i++ )
                {
                    ixp.push(recordset.recordset[i].Descripcion)
                }

                var allIng = [];

                for (let i = 0; i < result.todosLosIngredientes.length; i++)
                {
                    if (ixp.includes(result.todosLosIngredientes[i]))
                    {
                        var obj = {ingrediente: result.todosLosIngredientes[i], check: true};
                        allIng.push(obj);
                    }
                    else
                    {
                        var obj = {ingrediente: result.todosLosIngredientes[i], check: false};
                        allIng.push(obj);
                    }
                }

                res.render('UnSaborFinal', {
                    title: 'Seleccionar Pizza',
                    style: 'UnSaborFinal.css',
                    resPizzas: result.todasLasPizzas,
                    resIngredientes: allIng,
                    resObj: true
                });

            });
        }
    });
});

router.post('/setIngredientes', (req, res, next) => {
    nombrePizza = req.body.pizzaEspecial;

    pizzaEnConstruccion.name = req.body.pizzaEspecial;

    res.redirect('/UnSaborFinal');
});

function prepareIngredients(body)
{
    var listIng = [];

    for (var key in body)
    {
        var ing = {};

        if (key !== 'CantidadPizzas' && key !== 'addToCart')
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
    return listIng;
}

router.post('/finishUnSaborEspecial', (req, res) =>
{
    pizzaEnConstruccion.cantidad = req.body.CantidadPizzas;

    pizzaEnConstruccion.ingredientes = prepareIngredients(req.body);

    var info = "?order=" + JSON.stringify(pizzaEnConstruccion);

    res.redirect('/dashboard/addToCart' + info);
});

module.exports = router;
