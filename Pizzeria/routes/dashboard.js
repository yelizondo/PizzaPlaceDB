/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();

var Orden = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        res.render('dashboard', {
            title: 'Dashboard',
            style: 'dashboard.css',
            resOrden: Orden
        });
    }
});



router.get('/addToCart', (req, res, next) => {
    console.log(JSON.parse(req.query.order));
    var obj = JSON.parse(req.query.order);
    switch(obj.tipoOrden){
        case 'bebida':
            Orden.push({elemento: obj.tipo,
                            tamanno: obj.tamanno,
                            cantidad: obj.cantidad,
                            detalles: 'ninguno',
                            extras: 'ninguno',
                            precio: '0.0'
                        });
            break;
        case 'ensalada':
            var ing = 'Ingredientes: ';
            var ext = '';
            var vin = '';
            for (i = 0; i < obj.ingredientes.length; i++){
                ing = ing + ' ' + obj.ingredientes[i].name;
                if(obj.ingredientes[i].extra){
                    ext = ext + ' ' + obj.ingredientes[i].name;
                } 
            }
            if(obj.vinagreta != 'Ninguna'){
                vin = obj.vinagreta;
            }
            Orden.push({elemento: obj.tipo,
                tamanno: obj.tamanno,
                cantidad: obj.cantidad,
                detalles: ing,
                extras: vin + obj.pollo + ext,
                precio: '0.0'
            })
            break;
        case 'UnSabor':
            var ing = 'Ingredientes: ';
            var ext = '';
            for (i = 0; i < obj.ingredientes.length; i++){
                ing = ing + ' ' + obj.ingredientes[i].name;
                if(obj.ingredientes[i].extra){
                    ext = ext + ' ' + obj.ingredientes[i].name;
                } 
            }
            Orden.push({elemento: obj.tipo,
                tamanno: obj.tamanno,
                cantidad: obj. cantidad,
                detalles: ing,
                extras: ext,
                precio: '0.0'
            })
            break;
        case 'DosSabores':
            var ingP1 = 'Ingredientes Primera Mitad: ';
            var extP1 = 'Extras Primera Mitad: ';
            for (i = 0; i < obj.ingredientesP1.length; i++){
                ingP1 = ingP1 + ' ' + obj.ingredientesP1[i].name;
                if(obj.ingredientesP1[i].extra){
                    extP1 = extP1 + ' ' + obj.ingredientesP1[i].name;
                } 
            }
            var ingP2 = '\n\n--\nIngredientes Segunda Mitad: ';
            var extP2 = '\n\n--\nExtras Segunda Mitad:';
            for (i = 0; i < obj.ingredientesP2.length; i++){
                ingP2 = ingP2 + ' ' + obj.ingredientesP2[i].name;
                if(obj.ingredientesP2[i].extra){
                    extP2 = extP2 + ' ' + obj.ingredientesP2[i].name;
                } 
            }               
            Orden.push({elemento: obj.tipo,
                tamanno: obj.tamanno,
                cantidad: obj. cantidad,
                detalles: ingP1 + ingP2,
                extras: extP1 + extP2,
                precio: '0.0'
            })
            break;
        case 'DosSaboresEspecial':
                var ingP1 = 'Ingredientes Primera Mitad: ';
                var extP1 = 'Extras Primera Mitad: ';
                for (i = 0; i < obj.ingredientesP1.length; i++){
                    ingP1 = ingP1 + ' ' + obj.ingredientesP1[i].name;
                    if(obj.ingredientesP1[i].extra){
                        extP1 = extP1 + ' ' + obj.ingredientesP1[i].name;
                    } 
                }
                var ingP2 = '\n\n--\nIngredientes Segunda Mitad: ';
                var extP2 = '\n\n--\nExtras Segunda Mitad:';
                for (i = 0; i < obj.ingredientesP2.length; i++){
                    ingP2 = ingP2 + ' ' + obj.ingredientesP2[i].name;
                    if(obj.ingredientesP2[i].extra){
                        extP2 = extP2 + ' ' + obj.ingredientesP2[i].name;
                    } 
                }  
                Orden.push({elemento: obj.name1+'/'+obj.name2,
                    tamanno: obj.tamanno,
                    cantidad: obj. cantidad,
                    detalles: ingP1 + ingP2,
                    extras: extP1 + extP2,
                    precio: '0.0'
                })
                break;            
        default:
            console.log('default');
    }
    res.redirect('/dashboard');
});

module.exports = router;
