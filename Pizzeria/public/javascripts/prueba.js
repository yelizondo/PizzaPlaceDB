/*jshint esversion: 6 */
var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dbcon.insertPizza("Hola", (recordset) => {
        console.log(recordset);
});

{ email: 'yubeg971@gmail.com',
  details:
   [ { type: 'PizzaEspecial', name: 'UnSabor', ingredients: [Array] },
     { type: 'PizzaPersonalizada', ingredients: [Array] },
     { type: 'PizzaEspecial', name: 'UnSabor', ingredients: [Array] },
     { type: 'PizzaEspecial',
       name1: 'Carnivora',
       name2: 'Pollo BBQ',
       ingredients1: [Array],
       ingredients2: [Array] },
     { type: 'Ensalada',
       quantity: 1,
       vinagreta: 'Ninguna',
       ingredients: [Array] },
     { type: 'Bebida', quantity: 25 } ] };
