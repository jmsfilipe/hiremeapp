module.exports = function(app){


    var mongoose = require('mongoose');


    var Technology = require(__dirname+"/../models/Technology.js").Technology;
    var Area = require(__dirname+"/../models/Area.js").Area;
    var Company = require(__dirname+"/../models/Company.js").Company;
    var Question = require(__dirname+"/../models/Question.js").Question;
    var User = require(__dirname+"/../models/User.js").User;
    var Article = require(__dirname+"/../models/Article.js").Article;


    var userController = require(__dirname+'/../controllers/userController.js');

    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get a random question from the techology
    app.get('/api/get_question/:area/:technology/:level', function(req, res) {

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

    //list the areas
    app.get('/api/list_areas', function(req, res) {

        Area.find({}).exec(function(err, _res){
            res.send(_res);
        });

    });

    //list the technologies from an area
    app.get('/api/list_technologies/:area', function(req, res) {

        var area = req.params.area;

        Area.find({'name': area})
            .populate( 'technologies').exec(function(err, _res){
            res.send(_res[0].technologies);
        });

    });

    //list the articles
    app.get('/api/list_articles', function(req, res) {

        Article.find({}).exec(function(err, _res){
            res.send(_res);
        });

    });


    //------------------------------------------ users
    //list the areas
    app.get('/api/list_areas', function(req, res) {

        Area.find({}).exec(function(err, _res){
            res.send(_res);
        });

    });

    //add correct question score
    app.post('/api/user/correct_question', function(req, res) {

        var user_id = req.body.user_id;
        var question_id = req.body.question_id;

        User.findByIdAndUpdate(
            user_id,
            {$push: {"correct_questions": question_id}},
            function(err, model) {
                console.log(err)
            });

    });

    //add answered question score
    app.post('/api/user/answered_question', function(req, res) {

        var user_id = req.body.user_id;
        var question_id = req.body.question_id;

        User.findByIdAndUpdate(
            user_id,
            {$push: {"answered_questions": question_id}},
            function(err, model) {
                console.log(err)
            });

    });

    //get a score from a specific technology
    app.get('/api/user/:user/technology_score/:tech', function(req, res) {

        var technology = req.params.tech;
        var user_id = req.params.user;

        Technology.findOne({ name: { $in: [technology]} })
            .exec(function(err, tech){
            User.find({ correct_questions: { $in: tech.questions} }, function(err, user) {
                if (err) throw err;
                res.send({score: user[0].correct_questions.length});
            });
        });

    });

    //get a score from a specific area
    app.get('/api/user/:user/area_score/:area', function(req, res) {

        var area = req.params.area;
        var user_id = req.params.user;

        Area.findOne({ name: { $in: [area]} })
            .exec(function(err, area){
            console.log(area)
            User.find({ correct_questions: { $in: area.technologies.questions} }, function(err, user) {
                if (err) throw err;
                res.send({score: user[0].correct_questions.length});
            });
        });

    });

    //create user
    app.post('/api/user/new', function(req, res) {
        userController.createUser(req, res);
    });

    //get user
    app.get('/api/user',  function(req, res) {
        userController.getUser(req, res);
    });
    //   verifyEmailAvailable
    app.get('/api/signup/validator',  function(req, res) {
        userController.validateSignup(req, res);
    });

    app.get('/api/login/validator',  function(req, res) {
        userController.validateAccount(req, res);
    });





}
