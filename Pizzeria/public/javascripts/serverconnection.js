
/*jshint esversion: 6 */
var sql = require("mssql");

var dbConfig = {
	server: "pizzeria.cxgruvuhjzdc.us-east-2.rds.amazonaws.com",
	database: "Pizzeria",
	user: "Admininistrador",
	password: "Holamundo1234",
	port: 1433,
	encrypt: true
};


module.exports = {
	ingredientesPorEnsalada: function (pEnsalada, callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
		var request = new sql.Request(connection);
		connection.connect (function (err)
		{
			if (err)
			{
				console.log("Found error!");
				console.log(err);
				return;
			}

			request.input('EnsaladaName', sql.VarChar(50), pEnsalada);

			request.execute('SP_IngredientesPorEnsalada', function (err, recordset, returnValue)
			{
				if (err)
				{
					console.log(err);
				}
				else
				{
					recordset.spName = 'ingredientesPorEnsalada';
					callback(recordset);
				}
				connection.close();
			});
		});
	},
	insertarOrden : (pOrden, callback) => {
		var connection = new sql.ConnectionPool(dbConfig);
		var request = new sql.Request(connection);
		connection.connect (function (err)
		{
			if (err)
			{
				console.log("Found error!");
				console.log(err);
				return;
			}

			console.log(JSON.stringify(pOrden));

			request.input('Orden', sql.VarChar(4000), JSON.stringify(pOrden))

			request.execute('SP_InsertarOrden', function (err, recordset, returnValue) {
				if (err)
				{
					console.log(err);
				}
				else
				{
					callback(recordset);
				}
				connection.close();
			});
		})
	},

	insertNewPizza : function (pizza, callback)
	{
		var tpxt = new sql.Table(); // You can optionally specify table type name in the first argument.
		tpxt.columns.add('Pizza', sql.VarChar(50));
		tpxt.columns.add('Tamanno', sql.VarChar(50));
		tpxt.columns.add('Precio', sql.Int);

		var tixp = new sql.Table();
		tixp.columns.add('Pizza', sql.VarChar(50));
		tixp.columns.add('Ingrediente', sql.VarChar(50));

		for (var i = 0; i < pizza.ingredientes.length; i++)
		{
			tixp.rows.add(pizza.nombre, pizza.ingredientes[i]);
		}
		for (var j = 0; j < pizza.preciosXTamanno.length; j++)
		{
			tpxt.rows.add(pizza.nombre,
				pizza.preciosXTamanno[j].tamanno,
				parseInt(pizza.preciosXTamanno[j].precio, 10) );
		}

		var connection = new sql.ConnectionPool(dbConfig);
		var request = new sql.Request(connection);
		connection.connect (function (err)
		{
			if (err)
			{
				console.log("Found error!");
				console.log(err);
				return;
			}

			request.input('Pizza', sql.VarChar(50), pizza.nombre)
			request.input('TablaPizzaXTamanno', tpxt)
			request.input('TablaPizzaXIngrediente', tixp)

			request.execute('SP_InsertarNuevaPizza', function (err, recordset, returnValue) {
				if (err)
				{
					console.log(err);
				}
				else
				{
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	createNewClient : function (pNombre, pTelefono, pDireccion, pMail, callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
		var connection = new sql.ConnectionPool(dbConfig);
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
		var connection = new sql.ConnectionPool(dbConfig);
		var request = new sql.Request(connection);
		connection.connect (function (err)
		{
			if (err)
			{
				console.log("Found error! tamannos pizza");
				//console.log(err);
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
					recordset.spName = 'todosLosTamannosPizza';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todasLasPizzas: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todasLasPizzas';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todasLasEnsaladas: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todasLasEnsaladas';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todasLasBebidas: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todasLasBebidas';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todosLosIngredientes: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todosLosIngredientes';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todasLasSaborizaciones: function (callback)
	{
		var conn = new sql.ConnectionPool(dbConfig);
		var request = new sql.Request(conn);
		conn.connect (function (err)
		{
			if (err)
			{
				console.log("Found error! saborizaciones");
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
					recordset.spName = 'saborizaciones';
					callback(recordset);
				}
				conn.close();
			});
		});
	},

	ingredientesPorPizza: function (pPizza, callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'ingredientesPorPizza';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todosLosTamannosEnsalada: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todosLostamannosEnsalada';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todosLosTamannosBebida: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todosLosTamannosBebida';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	todasLasVinagretas: function (callback)
	{
		var connection = new sql.ConnectionPool(dbConfig);
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
					recordset.spName = 'todasLasVinagretas';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	calcularPrecioTamannoIngrediente: function (args, callback)
	{
		var pIngrediente = args.Ingrediente;
		var pTamanno = args.Tamanno;
		var connection = new sql.ConnectionPool(dbConfig);
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
			request.input('Ingrediente', sql.VarChar(50), pIngrediente)
			request.input('Tamanno', sql.VarChar(50), pTamanno)

			request.execute('SP_CalcularPrecioTamannoIngrediente', function (err, recordset, returnValue)
			{
				if (err)
				{
					console.log(err);
				}
				else
				{
					recordset.spName = 'calcularPrecioTamannoIngrediente';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	calcularPrecioTamannoPizza: function (args, callback)
	{
		var pTamanno = args.Tamanno;
		var connection = new sql.ConnectionPool(dbConfig);
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
			request.input('Tamanno', sql.VarChar(50), pTamanno)

			request.execute('SP_CalcularPrecioTamannoPizza', function (err, recordset, returnValue)
			{
				if (err)
				{
					console.log(err);
				}
				else
				{
					recordset.spName = 'calcularPrecioTamannoPizza';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	consultarPrecioEnsalada: function (args, callback)
	{
		var pTamanno = args.Tamanno;
		var connection = new sql.ConnectionPool(dbConfig);
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
			request.input('Tamanno', sql.VarChar(50), pTamanno)

			request.execute('SP_ConsultarPrecioEnsalada', function (err, recordset, returnValue)
			{
				if (err)
				{
					console.log(err);
				}
				else
				{
					recordset.spName = 'consultarPrecioEnsalada';
					callback(recordset);
				}
				connection.close();
			});
		});
	},

	consultarPrecioBebida: function (args, callback)
	{
		var pTamanno = args.Tamanno;
		var connection = new sql.ConnectionPool(dbConfig);
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
			request.input('Tamanno', sql.VarChar(50), pTamanno)

			request.execute('SP_ConsultarPrecioBebida', function (err, recordset, returnValue)
			{
				if (err)
				{
					console.log(err);
				}
				else
				{
					recordset.spName = 'consultarPrecioBebida';
					callback(recordset);
				}
				connection.close();
			});
		});
	}
}
