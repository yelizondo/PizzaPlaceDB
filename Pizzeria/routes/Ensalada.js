var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var ensaladaEnConstruccion = {};

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
        dtCPM.getStoredProcs([
            [dbcon.todasLasEnsaladas,"Descripcion"],
            [dbcon.todosLosTamannosEnsalada, "Descripcion"],
            [dbcon.todasLasVinagretas, "Descripcion"],
            [dbcon.todosLosIngredientes, "DESCRIPCION"]
        ], (result) => {
            res.render('Ensalada', {
                title: 'Seleccionar Ensalada',
                style: 'styles.css',
                resEnsaladas: result.todasLasEnsaladas,
                resTamannosEnsalada: result.todosLostamannosEnsalada,
                resVinagretas: result.todasLasVinagretas,
                resIngredientes: result.todosLosIngredientes
            });
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

    ensaladaEnConstruccion.tipo = req.body.ensalada;
    ensaladaEnConstruccion.tamanno = req.body.tamanno;
    ensaladaEnConstruccion.vinagreta = req.body.vinagreta;
    if(req.body.pollo){
        ensaladaEnConstruccion.pollo = true;
    }else{
        ensaladaEnConstruccion.pollo = false;
    }
    ensaladaEnConstruccion.cantidad = req.body.cantidad;
    ensaladaEnConstruccion.ingredientes = listIng;
    var info = "?order=" + JSON.stringify(ensaladaEnConstruccion) + "&tipoOrden=ensalada";

    res.redirect('/dashboard/addToCart' + info);
});

module.exports = router;
