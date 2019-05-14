var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');


dtC.getStoredProcs([
        [dbcon.todasLasPizzas, "Descripcion"],
        [dbcon.todosLosTamannosPizza, "Descripcion"]
    ], (result) => {
        console.log(result);
});








