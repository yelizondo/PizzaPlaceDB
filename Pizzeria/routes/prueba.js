var dbcon = require('./serverconnection.js');

dbcon.todasLasSaborizaciones(function(recordset)
{
	var cantidadElementos = recordset["rowsAffected"];
	var elementos = recordset["recordset"];
	
	$(document).ready(function() 
	{
		$dropdown = $("select[name='dropdown1']");
		 
		$dropdown.change(function() 
		{
			$("<li><a href=''>Gigantezco</a></li>").appendTo($dropdown);
			// //if the value from department selection is ‘Sales’ then…
			// if ($(this).val() == "Sales")
			// {
			// 	$("select[name='cname'] option").remove(); //remove all options from Contact names
			// 	$("<option>John Smith</option>").appendTo($cname); //add an option to Contact names
			// 	$("<option>Marry Jones</option>").appendTo($cname); //add an option to Contact names
			// }
		 
		});
	});
});


