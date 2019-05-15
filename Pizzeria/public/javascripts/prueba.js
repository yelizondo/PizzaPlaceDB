var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dbcon.todasLasBebidas((recorset) => {
    console.log(recorset);
});








