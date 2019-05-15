var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        title: 'Dashboard',
        style: 'dashboard.css'
    });
});

// Tomar el id de session
router.get('/addToCart', (req, res, next) => {

});

module.exports = router;
