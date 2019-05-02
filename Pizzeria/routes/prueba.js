var dbcon = require('./serverconnection.js');

dbcon.todosLosTamannosPizza( function (recordset)
{
    console.log(recordset);
});