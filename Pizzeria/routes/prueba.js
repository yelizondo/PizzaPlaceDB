var dbcon = require('./serverconnection.js');

dbcon.todasLasVinagretas(function(recordset)
{
	console.log(recordset);
});
