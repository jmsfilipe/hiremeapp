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

    apiRoutes.post('/user/add_friend', function(req, res) {

        var user_id = req.body.user_id;
        var user_to_add_id = req.body.user_to_add_id;

        User.findByIdAndUpdate(
            user_id,
            {$push: {"friends": user_to_add_id}},
            function(err, model) {
              if(err) throw err;
              User.findByIdAndUpdate(
                  user_to_add_id,
                  {$push: {"friends": user_id}},
                  function(err, model) {
                    if(err) throw err;
                    res.sendStatus(200);
                  });
            });



    });

    apiRoutes.post('/user/search', function(req, res) {

        var term = req.body.term;
        var user_id = req.body.user_id;
        var ObjectID = require('mongodb').ObjectID;
        var _id = new ObjectID(user_id);

        User.findById(user_id)
            .exec(function (err, user) {
              User.find({'name' : new RegExp(term, 'i'), "_id": {"$nin": user.friends, "$ne": _id} }, function(err, docs){
                console.log(docs)
                res.send(docs);
              });
            });


    });

    apiRoutes.post('/user/list_friends', function(req, res) {

        var user_id = req.body.user_id;

        User.findById(user_id)
            .populate( 'friends')
            .exec(function (err, user) {
              res.send({friends: user.friends});
            });

    });

    apiRoutes.post('/user/total_friends', function(req, res) {

        var user_id = req.body.user_id;

        User.findById(
            user_id,
            function(err, model) {
              console.log(model)
                res.send({total_friends: model.friends.length})
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
