/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var pizzaEnConstruccion = {};

/* GET users listing. */
router.get('/', (req, res, next) => {
    pizzaEnConstruccion = JSON.parse(req.query.order);
    res.render('DosSaboresFinal', {
        title: 'Crear Pizza',
        style: 'DosSaboresFinal.css'
    });
});

router.post('/addQuantity', (req, res) => {
    pizzaEnConstruccion.cantidad = req.body.cantidad;

    var info = "?order=" + JSON.stringify(pizzaEnConstruccion);

    res.redirect('/dashboard/addToCart' + info);
});

module.exports = router;
