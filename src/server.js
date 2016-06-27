// server.js

// set up ========================
var express  = require('express'),
    app      = express(),           // create our app w/ express
    fs       = require("fs"),
    path = require('path'),
    morgan = require('morgan'),             // log requests to the console (express4)
    bodyParser = require('body-parser'),    // pull information from HTML POST (express4)
    methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
    sassMiddleware = require('node-sass-middleware'),
    stylesheetSrcPath = __dirname +'/app/assets/stylesheets';


// configuration =================

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//sass configuration
app.use('/assets/stylesheets', sassMiddleware({
    src: stylesheetSrcPath,
    debug: true,
    outputStyle: 'expanded'
}));

// set the static files location /app/img will be /img for users
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/app'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// routes ======================================================================

// api ---------------------------------------------------------------------
// get a random question from the techology
app.get('/api/get_question/:area/:technology/:level', function(req, res) {

    var tech = req.params.technology;
    var area = req.params.area;
    var level = req.params.level;

    var path = __dirname+"/data/"+area+"/"+tech+"/"+level+"/";
    var filename = area+"_"+tech+"_"+level+".json";

    contents = fs.readFileSync(path + filename);
    var jsonContent = JSON.parse(contents);

    res.send(jsonContent);

});

//list the technologies fromm an area
app.get('/api/list_technologies/:area', function(req, res) {

    var area = req.params.area;

    var path = __dirname+"/data/"+area;
    var areas = getDirectories(path);

    res.send(areas);

});

//private funcs
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
