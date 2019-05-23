/*jshint esversion: 6 */
var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dtC.getStoredProcs1([
    [dbcon.funPrueba,{Description:"DESCRIPCION", Args : {Hola:'Hola', Mundo:'mundo'}}]
], (result) =>
{
    console.log(result);
});
