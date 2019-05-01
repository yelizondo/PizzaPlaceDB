var express = require('express');
var router = express.Router();
var path = require('path');
var dbcon = require('./serverconnection.js') ;
var session = require('express-session');


router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

router.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/login.html'));
  });


router.post('/authentication', function (request, response) {
    var email = request.body.email;
    if (email) 
    {        
        dbcon.checkClientExists(email, function (recordset) 
        {
            if (recordset == 1) {
                request.session.loggedIn = true;
                request.session.username = email;
                response.redirect('/home');
            }
            else {
                response.send("User doesn't exist. Consider to sign up.");
            }
        }); 
    }
    else
    {
        response.send('Please enter mail');
		response.end();
    }
});

router.get('/home', function(request, response) {
	if (request.session.loggedIn) {
		response.sendFile(path.join(__dirname + '/home.html'));
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

router.get('/signup', function (request, response)
{
    response.sendFile(path.join(__dirname + '/signup.html'));
});

router.get('/goback_signup_button', function (request, response)
{
    response.sendFile(path.join(__dirname + '/login.html'));
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
        if (email1 == email2) {
            dbcon.createNewClient(name, phone, address, email1, function (recordset) 
            {
                if (recordset == -113) {
                    response.redirect('/login');
                }
                else if (recordset == -112) {
                    //response.send("Email already in the database");
                    response.redirect('/signup');
                    ////request.body.mensaje = "hola";
                }
                else{
                    response.redirect('/signup');
                }
            }); 
        }
        else {
            response.send("Emails are different");
            
            //request.body.mensaje = "hola";
        }
        
    }
    else 
    {
        response.end();
    }
});


module.exports = router;
