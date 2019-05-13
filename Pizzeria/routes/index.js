var express = require('express');
var router = express.Router();
var session = require('express-session');


router.use(session({
	secret: '234rfvm876rdcmuedxcnjrdc',
	resave: true,
	saveUninitialized: true
}));

/* GET home page. */
router.get('/', function(req, res, next) 
{
	if (req.session.loggedIn)
	{
			res.redirect('/dashboard');
	}
	else
	{
			res.redirect('/login');
	}
});

module.exports = router;
