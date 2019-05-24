/*jshint esversion: 6 */
var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dtC.getStoredProcsArgs([
    [dbcon.consultarPrecioEnsalada,{Res : ["Precio"], Args : {Tamanno:'Grande'}}]
], (result) =>
{
    console.log(result.consultarPrecioEnsalada[0].Precio);
});
