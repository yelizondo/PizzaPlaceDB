/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var ensaladaEnConstruccion = {};
var Ingredientes = [];

function cleanIng(ing)
{
    return ing.split('-', 2)[1];
}

router.get('/', function(req, res, next)
{
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        dtCPM.getStoredProcs([
            [dbcon.todasLasEnsaladas,"Descripcion"],
            [dbcon.todosLosTamannosEnsalada, "Descripcion"],
            [dbcon.todasLasVinagretas, "Descripcion"],
            [dbcon.todosLosIngredientes, "DESCRIPCION"]
        ], (result) => {

            if (req.query.ings) {
                var ings = JSON.parse(req.query.ings);

                var allIng = [];

                for (let i = 0; i < ings.length; i++)
                {
                    allIng.push({ingrediente: ings[i], check: true});
                }
                res.render('Ensalada', {
                    title: 'Seleccionar Ensalada',
                    style: 'Ensalada.css',
                    resEnsaladas: result.todasLasEnsaladas,
                    resTamannosEnsalada: result.todosLostamannosEnsalada,
                    resVinagretas: result.todasLasVinagretas,
                    resIngredientes: allIng
                });
            }
            else
            {
                res.render('Ensalada', {
                    title: 'Seleccionar Ensalada',
                    style: 'Ensalada.css',
                    resEnsaladas: result.todasLasEnsaladas,
                    resTamannosEnsalada: result.todosLostamannosEnsalada,
                    resVinagretas: result.todasLasVinagretas,
                    resIngredientes: []
                });
            }


        });
    }
});

router.post('/iniciarCreacion', (req, res, next) =>
{
    var listIng = [];
    for (var key in req.body)
    {
        var ing = {};

        if (key !== 'tamanno', key != 'vinagreta', key !== 'ensalada' && key !== 'Añadir al Carrito' )
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

    ensaladaEnConstruccion.tipoOrden = 'ensalada';
    ensaladaEnConstruccion.tamanno = req.body.tamanno;
    ensaladaEnConstruccion.vinagreta = req.body.vinagreta;
    if(req.body.pollo){
        ensaladaEnConstruccion.pollo = 'Pollo';
    }else{
        ensaladaEnConstruccion.pollo = '';
}
    ensaladaEnConstruccion.cantidad = req.body.cantidad;
    ensaladaEnConstruccion.ingredientes = listIng;
    var info = "?order=" + JSON.stringify(ensaladaEnConstruccion);
    ensaladaEnConstruccion = {};
    res.redirect('/dashboard/addToCart' + info);
});

router.post('/setIngredientes', (req, res, next) =>
{
    var ensalada = req.body.ensalada;
    ensaladaEnConstruccion.tipo = req.body.ensalada;
    dbcon.ingredientesPorEnsalada(ensalada, (result) => {
        var ingredientes = [];
        for (var i = 0; i < result.recordset.length; i++) {
            ingredientes.push(result.recordset[i].Descripcion);
        }
        var items = '?ings=' + JSON.stringify(ingredientes);

        res.redirect('/Ensalada' + items);
    });

});

module.exports = router;
