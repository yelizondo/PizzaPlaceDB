var sql = require("mssql");

var dbConfig = {
	server: "db1itcr.database.windows.net",
	database: "Pizzeria",
	user: "Administrador",
	password: "Abcd1234",
	port: 1433,
	encrypt: true
};

var connection = new sql.ConnectionPool(dbConfig);


function createNewClient(pNombre, pTelefono, pDireccion, pMail)
{
	var request = new sql.Request(connection);
	connection.connect (function (err) 
	{
		if (err) 
		{
			console.log("Found error!");
			console.log(err);
			return;
		}

		request.input('Nombre', sql.VarChar(50), pNombre)
		request.input('Telefono', sql.Int, pTelefono)
		request.input('Direccion', sql.VarChar(50), pDireccion)
		request.input('Email', sql.VarChar(50), pMail)
		//request.output('Hola',sql.Int)
		request.execute('SP_CrearNuevoCliente', function (err, recordset, returnValue) {
			if (err) 
			{
				console.log(err);
			}
			else 
			{
				console.log(recordset);
			}
			connection.close();
		});

	})
}


createNewClient("Alejandro Solis", 8989898, "Cartago", "Alejandro@solis.com");