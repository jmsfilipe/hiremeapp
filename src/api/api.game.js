module.exports = function(apiRoutes){

    var Question = require(__dirname+"/../models/Question.js").Question;
    var Technology = require(__dirname+"/../models/Technology.js").Technology;
    var Area = require(__dirname+"/../models/Area.js").Area;
    var Company = require(__dirname+"/../models/Company.js").Company;

    // GAME : API ROUTES -------------------



    //list the areas
    apiRoutes.get('/list_areas', function(req, res) {

        Area.find({}).exec(function(err, _res){
            res.send(_res);
        });

    });

    //list the areas
    apiRoutes.get('/list_companies', function(req, res) {

        Company.find({}).exec(function(err, _res){
            res.send(_res);
        });

    });

    //list the technologies from an area
    apiRoutes.get('/list_technologies/:area', function(req, res) {

        var area = req.params.area;

        Area.find({'name': area})
            .populate( 'technologies').exec(function(err, _res){
            res.send(_res[0].technologies);
        });

    });

        // get a random question from the techology
    apiRoutes.get('/get_question/:area/:technology/:level', function(req, res) {

        var tech = req.params.technology;
        var area = req.params.area;
        var level = req.params.level;

        var questions = [];

        Area.find({'name': area})
            .populate( 'technologies', null, { name: { $in: [tech] } } )
            .exec(function(err, _res){
            Technology.find({'name': tech})
                .populate( 'questions', null, { level: { $in: [1] } } )
                .exec(function(err, _res){
                questions = _res[0].questions;
                var question = questions[Math.floor(Math.random() * questions.length)];
                res.send(question);
            })
        })

    });




}
