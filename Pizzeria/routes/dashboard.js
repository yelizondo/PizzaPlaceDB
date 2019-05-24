/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var dtC = require('../public/javascripts/querier.js');
var dbcon = require('../public/javascripts/serverconnection.js');

var Orden = [];
var Total = 0;

function generarQueryPizza(listaIngredientes, tamanno)
{
   var result = [];

   for (var i = 0; i < listaIngredientes.length; i++)
   {
       var nameIng = listaIngredientes[i].name;

       var query = [dbcon.calcularPrecioTamannoIngrediente,
           { Res : ["Precio"],
             Args : { Tamanno:tamanno, Ingrediente:nameIng}}];

       if (listaIngredientes[i].extra)
       {
           result.push(query);
       }

       result.push(query);
   }
   result.push([dbcon.calcularPrecioTamannoPizza,
       { Res : ["Precio"], Args : {Tamanno:tamanno}}]);

   return result;
}


router.get('/', function(req, res, next) {
    if (!req.session.loggedIn)
    {
        res.redirect('/login');
    }
    else
    {
        if (req.query.newOrder)
        {
            Orden.push(JSON.parse(req.query.newOrder));
        }
        Total = 0;
        console.log(Orden);
        if (Orden.length > 0)
        {
            for (var i = 0; i < Orden.length; i++)
            {
                Total += Orden[i].precio;
            }
        }

        res.render('dashboard', {
            title: 'Dashboard',
            style: 'dashboard.css',
            resOrden: Orden,
            resTotal: Total
        });
    }
});


router.get('/addToCart', (req, res, next) => {
    console.log(JSON.parse(req.query.order));
    var obj = JSON.parse(req.query.order);
    switch(obj.tipoOrden){
        case 'bebida':
            var Args = {Tamanno:obj.tamanno}
            dbcon.consultarPrecioBebida(Args, (result) => {
                var precio = 0;

                precio +=  parseInt(result.recordset[0].Precio, 10);

                precio *= parseInt(obj.cantidad);

                order = {
                    elemento: obj.tipo,
                    tamanno: obj.tamanno,
                    cantidad: obj.cantidad,
                    detalles: '',
                    extras: '',
                    precio: precio
                };

                var info = "?newOrder=" + JSON.stringify(order);
    
                res.redirect('/dashboard' + info);              
            });
            break;

        case 'ensalada':
            var Args = {Tamanno:obj.tamanno}
            dbcon.consultarPrecioEnsalada(Args, (result) => {
                var precio = 0;

                precio +=  parseInt(result.recordset[0].Precio, 10);
      
                var ing = 'Ingredientes: ';
                var ext = '';
                var vin = '';
                for (i = 0; i < obj.ingredientes.length; i++){
                    ing = ing + ' ' + obj.ingredientes[i].name;
                    if(obj.ingredientes[i].extra){
                        ext = ext + ' ' + obj.ingredientes[i].name;
                        precio += (250)
                    }
                }
                if(obj.vinagreta != 'Ninguna'){
                    vin = obj.vinagreta;
                    precio += (250)
                }
                if(obj.pollo == 'Pollo'){
                    precio += (200)
                }
    
                precio *= parseInt(obj.cantidad);
    
                order = {
                    elemento: obj.tipo,
                    tamanno: obj.tamanno,
                    cantidad: obj. cantidad,
                    detalles: ing,
                    extras: vin + ' ' + ext + ' ' + obj.pollo,
                    precio: precio
                };
    
                var info = "?newOrder=" + JSON.stringify(order);
    
                res.redirect('/dashboard' + info);
            });

            break;
        case 'UnSabor':

            var queries = generarQueryPizza(obj.ingredientes, obj.tamanno);

            dtC.getStoredProcsArgs(queries, (result) =>
            {
                var precio = 0;
                for (var i = 0; i < result.calcularPrecioTamannoIngrediente.length; i++)
                {
                    precio += parseInt(result.calcularPrecioTamannoIngrediente[i].Precio, 10);
                }

                precio +=  parseInt(result.calcularPrecioTamannoPizza[0].Precio, 10);

                precio *= parseInt(obj.cantidad);


                var ing = 'Ingredientes: ';
                var ext = '';
                for (i = 0; i < obj.ingredientes.length; i++){
                    ing = ing + ' ' + obj.ingredientes[i].name;
                    if(obj.ingredientes[i].extra){
                        ext = ext + ' ' + obj.ingredientes[i].name;
                    }
                }

                order = {
                    elemento: obj.tipo,
                    tamanno: obj.tamanno,
                    cantidad: obj. cantidad,
                    detalles: ing,
                    extras: ext,
                    precio: precio
                };

                var info = "?newOrder=" + JSON.stringify(order);

                res.redirect('/dashboard' + info);
            });

            break;
        case 'DosSabores':
                var ingredientes = obj.ingredientesP1.concat(obj.ingredientesP2);
                var queries = generarQueryPizza(ingredientes, obj.tamanno);

                dtC.getStoredProcsArgs(queries, (result) =>
                {
                    var precio = 0;
                    for (var i = 0; i < result.calcularPrecioTamannoIngrediente.length; i++)
                    {
                        precio += parseInt(result.calcularPrecioTamannoIngrediente[i].Precio, 10);
                    }
                    precio /= 2;
                    precio +=  parseInt(result.calcularPrecioTamannoPizza[0].Precio, 10);

                    precio *= parseInt(obj.cantidad);

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
                    
                    order = {
                        elemento: obj.tipo,
                        tamanno: obj.tamanno,
                        cantidad: obj.cantidad,
                        detalles: ingP1 + ingP2,
                        extras: extP1 + extP2,
                        precio: precio
                    };
                
                    var info = "?newOrder=" + JSON.stringify(order);
    
                    res.redirect('/dashboard' + info);
                });
            break;
        case 'DosSaboresEspecial':

                var ingredientes = obj.ingredientesP1.concat(obj.ingredientesP2);
                var queries = generarQueryPizza(ingredientes, obj.tamanno);

                dtC.getStoredProcsArgs(queries, (result) =>
                {
                    var precio = 0;
                    for (var i = 0; i < result.calcularPrecioTamannoIngrediente.length; i++)
                    {
                        precio += parseInt(result.calcularPrecioTamannoIngrediente[i].Precio, 10);
                    }
                    precio /= 2;
                    precio +=  parseInt(result.calcularPrecioTamannoPizza[0].Precio, 10);

                    precio *= parseInt(obj.cantidad);

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
                    
                    order = {
                        elemento: obj.name1+'/'+obj.name2,
                        tamanno: obj.tamanno,
                        cantidad: obj.cantidad,
                        detalles: ingP1 + ingP2,
                        extras: extP1 + extP2,
                        precio: precio
                    };
                
                    var info = "?newOrder=" + JSON.stringify(order);
    
                    res.redirect('/dashboard' + info);
                });
                break;
        default:
            console.log('default');
    }
    //res.redirect('/dashboard');
});

module.exports = router;
