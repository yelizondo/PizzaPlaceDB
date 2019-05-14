var dbcon = require(__dirname + '/serverconnection.js');
var async = require('async');

function cleanQueryResults (recordset, attName) 
{
    var pArray = [];
    var cantidadElementos = recordset["rowsAffected"];
    var elementos = recordset["recordset"];
    var spName = recordset.spName;

    for (i = 0; i < cantidadElementos; i++)
    {
        pArray.push(elementos[i][attName]);
    }
    return {name:spName, elements: pArray};
}

function prepareResultObject(pArray)
{
    var result = {};

    pArray.forEach((item) => {
        result[item.name] = item.elements;
    });

    return result;
}

module.exports = {
    getStoredProcs: (procs, callback) => {
        var functions = [];

        procs.forEach((item) => 
        {
            var f = item[0];
            var att = item[1];

            if (typeof(f) === 'function' && procs.length > 0)
            { 
                functions.push( (callback) => {
                    f( (recordset) => {
                        callback(null, cleanQueryResults(recordset, att));
                    });
                });
            }
            else
            {
                console.log(procs[i], "Not a function");
            }
        });
        
        async.parallel(functions, (err, results) => {
            if (err)
            {
                console.log(err);
            } 
           callback(prepareResultObject(results));
        });
    }
};

       