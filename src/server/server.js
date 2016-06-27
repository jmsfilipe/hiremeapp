// server.js

// set up ========================
var express  = require('express'),
    app      = express(),           // create our app w/ express
    morgan = require('morgan'),             // log requests to the console (express4)
    bodyParser = require('body-parser'),    // pull information from HTML POST (express4)
    methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
    sassMiddleware = require('node-sass-middleware'),
    stylesheetSrcPath = __dirname +'/../app/assets/stylesheets';

require('./routes')(app);

// configuration =================

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//sass configuration
app.use('/app/assets/stylesheets', sassMiddleware({
    src: stylesheetSrcPath,
    debug: true,
    outputStyle: 'expanded'
}));
console.log(stylesheetSrcPath)
// set the static files location /app/img will be /img for users
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
