// server.js

// set up ========================
var express  = require('express'),
    app      = express(),           // create our app w/ express
    morgan = require('morgan'),             // log requests to the console (express4)
    methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
    sassMiddleware = require('node-sass-middleware'),
    stylesheetSrcPath = __dirname +'/../app/assets/stylesheets',
    mongoose = require('mongoose');

mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

// configuration =================
app.use(morgan('dev'));  // log every request to the console
app.use(methodOverride());

require('./routes.js')(app);

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
var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port 8080");
