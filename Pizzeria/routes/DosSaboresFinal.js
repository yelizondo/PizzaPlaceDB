var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('DosSaboresFinal', {
        title: 'Crear Pizza',
        style: 'DosSaboresFinal.css'
    });
});

module.exports = router;