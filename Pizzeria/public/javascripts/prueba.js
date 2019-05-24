/*jshint esversion: 6 */
var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dbcon.insertPizza("Hola", (recordset) => {
        console.log(recordset);
});

var a = { 'email': 'yubeg971@gmail.com',
  'details':
   [ { 'consecutive': 1,
       'type': 'PizzaPersonalizada',
       'quantity': 1,
       'ingredients': [Array] },
     { 'consecutive': 2,
       'quantity': 1,
       'type': 'PizzaPersonalizada',
       'ingredients': [Array] },
     { 'consecutive': 3,
       'quantity': 2,
       'type': 'PizzaEspecialUnSabor',
       'name': 'Vegetariana',
       'ingredients': [Array] },
     { 'consecutive': 4,
       'type': 'PizzaEspecialDosSabores',
       'quantity': 2,
       'name1': 'Pollo BBQ',
       'name2': 'Carnivora',
       'ingredients1': [Array],
       'ingredients2': [Array] },
     { 'consecutive': 5,
       'type': 'Ensalada',
       'quantity': 3,
       'vinagreta': 'Ninguna',
       'ingredients': [Array] },
     { 'consecutive': 6, 'type': 'Bebida', 'quantity': 4 } ] }
