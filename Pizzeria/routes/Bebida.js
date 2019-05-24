var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

var bebidaEnConstruccion = {};

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
            [dbcon.todasLasBebidas,"Descripcion"],
            [dbcon.todosLosTamannosBebida, "Descripcion"]
        ], (result) => {
            res.render('Bebida', {
                title: 'Seleccionar Bebida',
                style: 'styles.css',
                resBebidas: result.todasLasBebidas,
                resTamannoBebidas: result.todosLosTamannosBebida
            });
        });
    }
});

router.post('/iniciarCreacion', (req, res, next) =>
{
    bebidaEnConstruccion.tipoOrden = 'bebida';
    bebidaEnConstruccion.tipo = req.body.bebida;
    bebidaEnConstruccion.tamanno = req.body.tamanno;
    bebidaEnConstruccion.cantidad = req.body.cantidad;

    var info = "?order=" + JSON.stringify(bebidaEnConstruccion);
    bebidaEnConstruccion = {};
    res.redirect('/dashboard/addToCart' + info);
});

module.exports = router;
