/*jshint esversion: 6 */
var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dtC.getStoredProcsArgs([
    [dbcon.calcularPrecioTamannoIngrediente,{Res : ["Precio"], Args : {Tamanno:'Grande', Ingrediente:'Jamon'}}],
    [dbcon.calcularPrecioTamannoIngrediente,{Res : ["Precio"], Args : {Tamanno:'Fiestera', Ingrediente:'Jamon'}}]
], (result) =>
{
    console.log(result.calcularPrecioTamannoIngrediente[0].Precio);
    console.log(result.calcularPrecioTamannoIngrediente[1].Precio);
});
