var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Mantenimiento', {
      title: 'Mantenimiento',
      style: 'Mantenimiento.css',
      resIngredientes: ['Apio','Ajo']
  });
});

module.exports = router;
