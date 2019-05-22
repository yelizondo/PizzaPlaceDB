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
    // Load the first part of the pizza to out global pizza variable
    if (Object.entries(pizzaEnConstruccion).length === 0 && pizzaEnConstruccion.constructor === Object)
    {
        pizzaEnConstruccion = JSON.parse(req.query.order);
    }

    // Call the database
    dtCPM.getStoredProcs([
      [dbcon.todasLasPizzas,"Descripcion"],
      [dbcon.todosLosIngredientes, "DESCRIPCION"]
    ], (result) => {

        /* Check if the pizza name exists,
        * if not, then just load the ingredientes
        * else, load the ingredientes and select those specific to the pizza selected
        */
        if (pizzaEnConstruccion.name2 === "" || pizzaEnConstruccion.name2 == null)
        {
            // Ingredients var
            var ipx = [];

            // Get the ingredientes from the database result
            for (var i = 0; i < result.todosLosIngredientes.length; i++ )
            {
                ipx.push(result.todosLosIngredientes[i])
            }

            // Variable for the result Ingredients
            // It will contain objects {ingrediente: 'name', check: 'false'}
            var allIng = [];

            // Create all the objects
            for (let i = 0; i < ipx.length; i++)
            {
                allIng.push({ingrediente: ipx[i], check: false});
            }

            // Then render the page with those ingredients
            res.render('SegundaMitad', {
                title: 'Seleccionar Segunda Mitad',
                style: 'SegundaMitad.css',
                resPizzas: result.todasLasPizzas,
                resIngredientes: allIng
            });
        }
        else
        {
            // Get all the ingredients for the given pizza from de db
            dbcon.ingredientesPorPizza(pizzaEnConstruccion.name2, (recordset) =>
            {
                // Ingredients for that specific pizza
                var ixp = [];

                // Get all the ingrediets from the db result
                for (var i = 0; i < recordset.recordset.length; i++ )
                {
                    ixp.push(recordset.recordset[i].Descripcion)
                }

                // Var for the result object ingredients
                var allIng = [];

                // Get the ingredients to check
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

                // Render the page with the new ingredients
                res.render('SegundaMitad', {
                    title: 'Seleccionar Segunda Mitad',
                    style: 'SegundaMitad.css',
                    resPizzas: result.todasLasPizzas,
                    resIngredientes: allIng,
                    resObj: true
                });

            });
        }



  });
});

router.post('/setIngredientes', (req, res, next) => {

    pizzaEnConstruccion.name2 = req.body.pizzaEspecial;

    res.redirect('/SegundaMitad');
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

router.post('/finishSegundoSaborEspecial', (req, res) =>
{
    pizzaEnConstruccion.ingredientesP2 = prepareIngredients(req.body);

    var info = "?order=" + JSON.stringify(pizzaEnConstruccion);

    res.redirect('/DosSaboresFinal' + info);
});

module.exports = router;
