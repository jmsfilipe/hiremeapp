// server.js

// set up ========================
var express  = require('express'),
    app      = express(),           // create our app w/ express
    morgan = require('morgan'),             // log requests to the console (express4)
    methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
    sassMiddleware = require('node-sass-middleware'),
    stylesheetSrcPath = __dirname +'/../app/assets/stylesheets',
    bodyParser = require('body-parser'),    // pull information from HTML POST (express4)
    mongoose = require('mongoose'),
    config = require('./config'),
    jwt    = require('jsonwebtoken');



// configuration =================
// used to create, sign, and verify tokens
// connect to mongoDB database on modulus.io
mongoose.connect(config.database);
// secret variable
app.set('superSecret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('../api/api.js')(app, express, mongoose, jwt, pusher);


//sass configuration
app.use('/app/assets/stylesheets', sassMiddleware({
    src: stylesheetSrcPath,
    debug: true,
    outputStyle: 'expanded'
}));


// set the static files location /app/img will be /img for users
app.use('/vendor', express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../'));

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 8080);
console.log('Magic happens at http://localhost:8080');
