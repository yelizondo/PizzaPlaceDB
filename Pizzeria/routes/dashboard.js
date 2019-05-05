var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        title: 'Dashboard',
        style: 'dashboard.css'
    });
});

module.exports = router;
