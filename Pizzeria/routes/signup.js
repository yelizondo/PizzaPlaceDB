var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');

var responseMessage = "";

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup', {
        title: 'Sign Up',
        style: 'signup.css',
        resp: responseMessage
    });
    responseMessage = "";
});

router.post('/registration', function (request, response) 
{ 
    var name = request.body.Name;
    var phone = request.body.Phone;
    var address = request.body.Address;
    var email1 = request.body.Email1;
    var email2 = request.body.Email2;

    if (name && phone && address && email1 && email2) 
    {
        if (email1 == email2) 
        {
            dbcon.createNewClient(name, phone, address, email1, function (recordset) 
            {
                if (recordset == -113) {
                    response.render('login', {
                        title: 'Login',
                        style: 'login.css',
                        resp: "Now sign in"
                    });
                }
                else if (recordset == -112) 
                {
                    responseMessage = "Email already in the database";
                    response.redirect('/signup');
                }
                else
                {
                    response.redirect('/signup');
                }
            }); 
        }
        else {
            /*
            res.render('signup', {
                title: 'Sign Up',
                style: 'signup.css',
                resp: 'The two emails are different'
            });
            */
            responseMessage = "The two emails are different";
            response.redirect('/signup');
        }
    }
    else 
    {
        response.end();
    }
});

module.exports = router;
