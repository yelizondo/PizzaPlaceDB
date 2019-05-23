var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dbcon.calcularPrecioTamannoIngrediente('Jamon', 'Pequeña', (recorset) => {
    console.log(recorset);
});







