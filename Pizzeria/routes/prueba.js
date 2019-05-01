var dbcon = require('./serverconnection.js');

dbcon.createNewClient('hg', 2, 'hg', 'hg', function (recordset)
{
    console.log(recordset);
});