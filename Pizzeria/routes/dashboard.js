var express = require('express');
var router = express.Router();

var Orden = []

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        title: 'Dashboard',
        style: 'dashboard.css',
        resOrden: Orden
    });
});

// Tomar el id de session
router.get('/addToCart', (req, res, next) => {
    console.log(obj);
    switch(req.query.tipoOrden){
        case 'bebida':     
            Orden.push({elemento: req.query.bebida, 
                            tamanno: req.query.tamanno,
                            cantidad: req.query.cantidad,
                            extras: 'ninguno',
                            precio: 'bebida'
                        });
            break;
        case 'ensalada':
            var obj = JSON.parse(req.query.order);             
            Orden.push({elemento: obj.tipo, 
                tamanno: obj.tamanno,
                cantidad: obj.cantidad,
                extras: obj.vinagreta,
                precio: 'ensalada'
            })
            break;
        default:
            console.log('default');
    }
    res.redirect('/dashboard');
});

module.exports = router;
