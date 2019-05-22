var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');

var responseMessage = "";

router.get('/', function(req, res, next) {

  res.render('login', {
      title: 'Login',
      style: 'login.css',
      resp: responseMessage
  });
  responseMessage = "";
});

router.post('/auth', function (request, response) {
    var email = request.body.email;
    if (email)
    {
        dbcon.checkClientExists(email, function (recordset)
        {
            if (recordset == 1) {
                request.session.loggedIn = true;
                request.session.username = email;
                if (email == "admin@pizzeria.com")
                {
                    response.redirect('/Mantenimiento');
                }
                else
                {
                    response.redirect('/dashboard');
                }

            }
            else {

                responseMessage = 'User doesn\'t exist. Consider to sign up.';
                response.redirect('/login');
            }
        });
    }
    else
    {
		response.end();
    }
});

router.get('/logout', function (request, response)
{
    request.session.loggedIn = false;
    response.redirect('/login');
});

module.exports = router;
