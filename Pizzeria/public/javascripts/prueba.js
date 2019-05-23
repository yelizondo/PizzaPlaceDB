var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');


dbcon.calcularPrecioTamannoPizza('Pequeña', (recorset) => {
    console.log(recorset);
});







