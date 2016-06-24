// server.js

// set up ========================
var express  = require('express'),
    app      = express(),                             // create our app w/ express
    morgan = require('morgan'),             // log requests to the console (express4)
    bodyParser = require('body-parser'),    // pull information from HTML POST (express4)
    methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
    stylesheetSrcPath = __dirname + '/app/assets/sass',
    stylesheetDestPath = __dirname + '/app/public/styles';

// configuration =================
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/src', express.static(__dirname + '/src'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//sass configuration
var sassMiddleware = require('node-sass-middleware');
app.use('/styles', sassMiddleware({
  src: stylesheetSrcPath,
  dest: stylesheetDestPath,
  debug: true,
  outputStyle: 'expanded'
}));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app'));                    

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {

  res.json("cenas"); // return all todos in JSON format

});
