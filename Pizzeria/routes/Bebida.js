var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');
var dtCPM = require('../public/javascripts/querier.js');

router.get('/', function(req, res, next) 
{
    // Query todas las saborizaciones
    dtCPM.getStoredProcs([
        [dbcon.todasLasBebidas,"Descripcion"],
        [dbcon.todosLosTamannosBebida, "Descripcion"]
    ], (result) => {
        res.render('Bebida', {
            title: 'Seleccionar Bebida',
            style: 'Bebida.css',
            resBebidas: result.todasLasBebidas,
            resTamannoBebidas: result.todosLosTamannosBebida
        });
    });
});

router.post('/iniciarCreacion', (req, res) => 
{
    var bodyBebida = req.body.bebida;
    var bodyTamanno = req.body.tamanno;
    var bodyCantBebidas = req.body.cantidad;

    var items = '?bebida=' + bodyBebida + '&tamanno=' + bodyTamanno + '&cantidad=' + bodyCantBebidas + "&tipoOrden=bebida";
    
    res.redirect('/dashboard/addToCart' + items);
});

module.exports = router;