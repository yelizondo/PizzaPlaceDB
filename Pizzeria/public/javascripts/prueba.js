/*jshint esversion: 6 */
var dtC = require(__dirname + '/querier.js');
var dbcon = require(__dirname + '/serverconnection.js');

dbcon.insertPizza("Hola", (recordset) => {
        console.log(recordset);
});
