module.exports = function(apiRoutes){

    var Technology = require(__dirname+"/../models/Technology.js").Technology;
    var Area = require(__dirname+"/../models/Area.js").Area;
    var Company = require(__dirname+"/../models/Company.js").Company;
    var Question = require(__dirname+"/../models/Question.js").Question;
    var User = require(__dirname+"/../models/User.js").User;

    // USER : API ROUTES -------------------


    // route to return all users (GET http://localhost:8080/api/users)
    apiRoutes.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });   
    
    
        //add correct question score
    apiRoutes.post('/user/correct_question', function(req, res) {

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
    apiRoutes.post('/user/answered_question', function(req, res) {

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
    apiRoutes.get('/user/:user/technology_score/:tech', function(req, res) {

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
    apiRoutes.get('/user/:user/area_score/:area', function(req, res) {

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


}