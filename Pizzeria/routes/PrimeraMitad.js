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

        if (pizzaEnConstruccion.name1 === "")
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

            res.render('PrimeraMitad', {
                title: 'Seleccionar Primera Mitad',
                style: 'PrimeraMitad.css',
                resPizzas: result.todasLasPizzas,
                resIngredientes:allIng
            });
        }
        else
        {
            dbcon.ingredientesPorPizza(pizzaEnConstruccion.name1, (recordset) =>
            {
                var ixp = [];

                for (var i = 0; i < recordset.recordset.length; i++ )
                {
                    ixp.push(recordset.recordset[i].Descripcion)
                }

                var allIng = [];

                for (let i = 0; i < result.todosLosIngredientes.length; i++)
                {
                  var obj = {};
                    if (ixp.includes(result.todosLosIngredientes[i]))
                    {
                        obj = {ingrediente: result.todosLosIngredientes[i], check: true};
                    }
                    else
                    {
                        obj = {ingrediente: result.todosLosIngredientes[i], check: false};
                    }
                    allIng.push(obj);
                }

                res.render('PrimeraMitad', {
                    title: 'Seleccionar Primera Mitad',
                    style: 'PrimeraMitad.css',
                    resPizzas: result.todasLasPizzas,
                    resIngredientes: allIng,
                    resObj: true
                });

            });
        }
    });
});

router.post('/setIngredientes', (req, res, next) => {

    pizzaEnConstruccion.name1 = req.body.pizzaEspecial;

    res.redirect('/PrimeraMitad');
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

router.post('/finishPrimerSaborEspecial', (req, res) =>
{

    pizzaEnConstruccion.ingredientesP1 = prepareIngredients(req.body);

    var info = "?order=" + JSON.stringify(pizzaEnConstruccion);

    res.redirect('/SegundaMitad' + info);
});

module.exports = router;
