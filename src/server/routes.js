module.exports = function(app){

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

    var Technology = require(__dirname+"/../models/Technology.js").Technology;
    var Area = require(__dirname+"/../models/Area.js").Area;
    var Level = require(__dirname+"/../models/Level.js").Level;
    var Question = require(__dirname+"/../models/Question.js").Question;
    var User = require(__dirname+"/../models/User.js").User;


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

    //list the areas
    app.get('/api/list_areas', function(req, res) {

        var path = __dirname+"/data/";
        var areas = getDirectories(path);

        res.send(areas);

    });

    //list the technologies from an area
    app.get('/api/list_technologies/:area', function(req, res) {

        var area = req.params.area;

        var path = __dirname+"/data/"+area;
        var technologies = getDirectories(path);

        res.send(technologies);

    });


    //private funcs
    function getDirectories(srcpath) {
        return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }

}
