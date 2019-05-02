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

module.exports = {
	createNewClient : function (pNombre, pTelefono, pDireccion, pMail, callback)
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
			var result = 0;
			request.input('Nombre', sql.VarChar(50), pNombre)
			request.input('Telefono', sql.Int, pTelefono)
			request.input('Direccion', sql.VarChar(50), pDireccion)
			request.input('Email', sql.VarChar(50), pMail)
			request.output('Result', sql.Int)

			request.execute('SP_CrearNuevoCliente', function (err, recordset, returnValue) {
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['returnValue']);
				}
				connection.close();
			});	
		})
	},

	checkClientExists: function (pMail,callback)
	{
		var result = false;
		var request = new sql.Request(connection);
		connection.connect (function (err) 
		{
			if (err) 
			{
				console.log("Found error!");
				console.log(err);
				return;
			}
	
			request.input('Email', sql.VarChar(50), pMail)
			request.output('Result',sql.Int)
			
			request.execute('SP_DoesClientExist', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['returnValue']);
				}
				connection.close();
			});
	
		})
		return result;
	},

	todosLosTamannosPizza: function (callback)
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

			request.execute('SP_TodosLosTamañosDePizza', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todasLasPizzas: function (callback)
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

			request.execute('SP_TodasLasPizzas', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todasLasEnsaladas: function (callback)
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

			request.execute('SP_TodasLasEnsaladas', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todasLasBebidas: function (callback)
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

			request.execute('SP_TodasLasBebidas', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todasLasBebidas: function (callback)
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

			request.execute('SP_TodasLasBebidas', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todosLosIngredientes: function (callback)
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

			request.execute('SP_TodosLosIngredientes', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todasLasSaborizaciones: function (callback)
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

			request.execute('SP_TodasLasSaborizaciones', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	ingredientesPorPizza: function (pPizza, callback)
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

			request.input('PizzaName', sql.VarChar(50), pPizza);

			request.execute('SP_IngredientesPorPizza', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todosLosTamannosEnsalada: function (callback)
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

			request.execute('SP_TodosLosTamañosDeEnsalada', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todosLosTamannosBebida: function (callback)
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

			request.execute('SP_TodosLosTamañosDeBebida', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	},

	todasLasVinagretas: function (callback)
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

			request.execute('SP_TodasLasVinagretas', function (err, recordset, returnValue) 
			{
				if (err) 
				{
					console.log(err);
				}
				else 
				{
					callback(recordset['recordset']);
				}
				connection.close();
			});
		});
	}

}
