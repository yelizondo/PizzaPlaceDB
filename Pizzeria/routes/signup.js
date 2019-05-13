var express = require('express');
var router = express.Router();
var dbcon = require('../public/javascripts/serverconnection.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup', {
        title: 'Sign Up',
        style: 'signup.css',
        resp: ''
    });
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
                    response.send("Successful");
                    //response.redirect('/login');
                }
                else if (recordset == -112) 
                {
                    response.send("already in the database");
                    /*
                    res.render('signup', {
                        title: 'Sign Up',
                        style: 'signup.css',
                        resp: 'Email already in the database'
                    });
                    */
                }
                else
                {
                    response.send("Unauthorized access");
                    //response.redirect('/signup');
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
           response.send("The two emails are different");
        }
    }
    else 
    {
        response.end();
    }
});

router.get('/goback_signup_button', function (request, response)
{
    response.redirect('/login');
});

module.exports = router;
