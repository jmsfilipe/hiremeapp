module.exports = function(apiRoutes){

    var Technology = require(__dirname+"/../models/Technology.js").Technology;
    var Area = require(__dirname+"/../models/Area.js").Area;
    var Company = require(__dirname+"/../models/Company.js").Company;
    var Question = require(__dirname+"/../models/Question.js").Question;
    var User = require(__dirname+"/../models/User.js").User;
    var General = require(__dirname+"/../models/General.js").General;
    var WhoseOnline = require(__dirname+"/../models/WhoseOnline.js").WhoseOnline;

    // USER : API ROUTES -------------------


    // route to return all users (GET http://localhost:8080/api/users)
    apiRoutes.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    apiRoutes.post('/user/friends_state', function(req, res) {
        var user_id = req.body.user_id;
        User.findById(user_id)
            .populate('friends')
            .lean()
            .exec(function(err, model) {
                if(err) throw err;
                var friends = model.friends;
                WhoseOnline.find({'user': { $in: friends }})
                    .populate( 'user' )
                    .exec(function(err, _res){
                      var onlineFriends = _res;

                      for(var i = 0; i < friends.length; i++) {
                        for(var j = 0; j < onlineFriends.length; j++) {
                          if(onlineFriends[j].user._id.equals(friends[i]._id)){
                            friends[i].status = "online";
                          }
                        }
                      }
                      res.json(friends);
                })
            });
    });

    apiRoutes.post('/user/register_as_online', function(req, res) {
        var user_id = req.body.user_id;

        WhoseOnline.findOne({'user': user_id})
            .exec(function (err, online) {
            if(online){
              online.timestamp = Date.now();
              online.save(function (err) {
                  if(err) {
                      console.error('ERROR!');
                  }
              });
            } else{
              var entry = new WhoseOnline({user: user_id});

              entry.save(function (err) {
                if (err) {
                  return err;
                }
                else {
                  console.log("Post saved");
                }
              });

            }
        });

    });

    //add friend to friends list
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
                        User.findByIdAndUpdate(
                            user_id,
                            {$pull: {"friend_requests": user_to_add_id}},
                            function(err, model) {
                                if(err) throw err;
                                      res.sendStatus(200);
                            });
                        });
                    });
    });

    //add friend to friends list
    apiRoutes.post('/user/add_friend_request', function(req, res) {

        var user_id = req.body.user_id;
        var user_to_add_id = req.body.user_to_add_id;

        User.findByIdAndUpdate(
            user_to_add_id,
            {$push: {"friend_requests": user_id}},
            function(err, model) {
                if(err) throw err;
                res.sendStatus(200);
            });
    });

    //add friend to friends list
    apiRoutes.post('/user/remove_friend_request', function(req, res) {

        var user_id = req.body.user_id;
        var user_to_remove_id = req.body.user_to_remove_id;

        User.findByIdAndUpdate(
            user_id,
            {$pull: {"friend_requests": user_to_remove_id}},
            function(err, model) {
                if(err) throw err;
                res.sendStatus(200);
            });
    });

    //search friend by name or email
    apiRoutes.post('/user/search', function(req, res) {

        var term = req.body.term;
        var user_id = req.body.user_id;
        var ObjectID = require('mongodb').ObjectID;
        var _id = new ObjectID(user_id);

        User.findById(user_id)
            .exec(function (err, user) {
            User.find({$or: [{'email' : new RegExp(term, 'i')}, {'name' : new RegExp(term, 'i')}], "_id": {"$nin": user.friends, "$ne": _id} }, function(err, docs){
                res.send(docs);

            });
        });

    });

    //list all the friends of a user
    apiRoutes.post('/user/list_friends', function(req, res) {

        var user_id = req.body.user_id;

        User.findById(user_id)
            .populate( 'friends')
            .exec(function (err, user) {
            res.send({friends: user.friends});
        });

    });

    //list all the friends of a user
    apiRoutes.post('/user/list_friend_requests', function(req, res) {

        var user_id = req.body.user_id;

        User.findById(user_id)
            .populate( 'friend_requests')
            .exec(function (err, user) {
            res.send({friend_requests: user.friend_requests});
        });

    });

    //total number of friends of a user
    apiRoutes.post('/user/total_friends', function(req, res) {

        var user_id = req.body.user_id;

        User.findById(
            user_id,
            function(err, model) {
                console.log(model)
                res.send({total_friends: model.friends.length})
            });

    });

    //increment the global score of a user
    apiRoutes.post('/user/update_score', function(req, res) {

        var user_id = req.body.user_id;

        User.findByIdAndUpdate(
            user_id,
            {$inc: {score:1}},
            function(err, model) {
                if(err) throw err;
                res.sendStatus(200);
            });

    });

    //get the global score of a user
    apiRoutes.post('/user/get_score', function(req, res) {

        var user_id = req.body.user_id;

        User.findById(
            user_id,
            function(err, model) {
                if(err) throw err;
                res.send({score: model.score});
            });

    });

    //save the settings panel
    apiRoutes.post('/user/settings', function(req, res) {

        var user_id = req.body.user_id;
        var _pwd = req.body.password;
        var _email = req.body.email;
        var _gender = req.body.gender;

        User.findByIdAndUpdate(
            user_id,
            {password: _pwd, email: _email, gender: _gender},
            function(err, model) {
                console.log(model)
                if(err) throw err;
                res.sendStatus(200);
            });

    });

    //add correct question score
    apiRoutes.post('/user/correct_question', function(req, res) {

        var user_id = req.body.user_id;
        var question_id = req.body.question_id;

        var techName = "";
        var areaName = "";
        var companyName = "";
        var generalName = "";

        Technology.find({ questions: question_id})
        .exec(function(err, _resTechnology){

          if(_resTechnology.length > 0){
            techName = _resTechnology[0].name;

          Area.find({ technologies: _resTechnology[0]._id})
          .exec(function(err, _resArea){

              if(_resArea.length > 0)
                areaName = _resArea[0].name;

              if(areaName){
                var area = {};
                area["area."+areaName] = 1;
                User.findOneAndUpdate({_id: user_id}, {$inc: area}, function(err, doc){
                  if(err){
                    console.log("Something wrong when updating data!");
                  }
                  var tech = {};
                  tech["tech."+techName] = 1;
                  User.findOneAndUpdate({_id: user_id}, {$inc: tech}, function(err, doc){
                    if(err){
                      console.log("Something wrong when updating data!");
                    }
                    res.sendStatus(200);
                  });
                });
              } else{
                getCompany();
              }
            });
          } else{
            getCompany();
          }
        });

        var getCompany = function(){
          Company.find({ questions: question_id})
          .exec(function(err, _resCompany){

            if(_resCompany.length > 0)
              companyName = _resCompany[0].name;

            if(companyName){
              var company = {};
              company["company."+companyName.toLowerCase()] = 1;
              User.findOneAndUpdate({_id: user_id}, {$inc: company}, function(err, doc){
                console.log(companyName)
                if(err){
                  console.log("Something wrong when updating data!");
                }
                res.sendStatus(200);
              });
            } else{
              getGeneral();
            }

          });
      }

      var getGeneral = function(){
        General.find({ questions: question_id})
        .exec(function(err, _resGeneral){
          if(_resGeneral.length > 0)
            generalName = _resGeneral[0].name;

          if(generalName){
            var general = {};
            general["general."+generalName.toLowerCase()] = 1;
            User.findOneAndUpdate({_id: user_id}, {$inc: general}, function(err, doc){
              if(err){
                console.log("Something wrong when updating data!");
              }
              res.sendStatus(200);
            });
          }
        });
      }


    });

    //get a user score, grouped by technologies
    apiRoutes.post('/user/list_scores/', function(req, res) {

        var user_id = req.body.user_id;

        User.findOne({ _id: user_id})
            .exec(function(error, user) {
              res.send({
                total_score: user.score,
                company_scores: user.company,
                general_scores: user.general,
                tech_scores: user.tech,
                area_scores: user.area});
        })

    });


}
