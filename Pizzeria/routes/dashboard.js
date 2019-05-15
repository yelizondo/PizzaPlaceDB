var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var A = [{elemento:'Pollo', tamanno:'Fiestera', cantidad:'3', extras:'queso, jamon, peperoni', precio:'30000'}];
    res.render('dashboard', {
        title: 'Dashboard',
        style: 'dashboard.css',
        resOrden: A
    });
});

// Tomar el id de session
router.get('/addToCart', (req, res, next) => {
    var pizza = JSON.parse(req.query.order);
    console.log(pizza);
    res.redirect('/dashboard');
});

module.exports = router;
