var dbcon = require('./serverconnection.js');

dbcon.todasLasSaborizaciones(function(recordset)
{
	var cantidadElementos = recordset["rowsAffected"];
	var elementos = recordset["recordset"];
	
	for (i = 0; i < cantidadElementos; i++)
	{
		console.log(elementos[i]["DESCRIPCION"]);
	}

});

$("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
});

