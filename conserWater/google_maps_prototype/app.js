var express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');

var express = require('express');
var app = express();
const PORT = 8000;
ALLOWED_PATHS = ['/','/index.html']

app.use(express.static('public'));
app.get('/', function(req,res) {
	res.sendFile('./index.html');
});

app.listen(PORT, function() {console.log("Started server.");});
