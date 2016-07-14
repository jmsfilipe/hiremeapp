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

    //list al technologies
    apiRoutes.get('/list_technologies', function(req, res) {

    Technology.find({}).exec(function(err, _res){
            res.send(_res);
        });


    });

        // get a random question from the techology
    apiRoutes.post('/get_question', function(req, res) {

        var techs = req.body.technologies;
        var areas = req.body.areas;
        var companies = req.body.companies;
        var general = req.body.general;
        var level = req.body.level;

        var questions = [];
        if(companies.length > 0){
          Company.find({ name: { $in: companies } })
                .populate('questions')
                .exec(function(err, _res){
                  for(var i = 0; i < _res.length; i++){
                    questions = questions.concat(_res[i].questions);
                    }
                  })
                  console.log(questions)
        }
        if(techs.length > 0){ //filtered by techs
          Area.find()
              .populate( 'technologies', null, { name: { $in: techs } } )
              .exec(function(err, _res){
              Technology.find({'name': { $in: techs }})
                  .populate( 'questions', null, { level: { $in: level } } )
                  .exec(function(err, _res){
                    for(var i = 0; i < _res.length; i++){
                      questions = questions.concat(_res[i].questions);
                    }
              })
          })
        }
        if(areas.length > 0){ //filtered by areas
          Area.find({'name': { $in: areas }})
              .populate( 'technologies' )
              .exec(function(err, _res){

              var techIds = [];
              for(var i = 0; i < _res.length; i++){
                for(var j = 0; j < _res[i].technologies.length; j++){
                  techIds.push(_res[i].technologies[j]._id);
                }
              }

              Technology.find({_id: {$in: techIds}})
                  .populate( 'questions', null, { level: { $in: level } } )
                  .exec(function(err, _res){
                    for(var i = 0; i < _res.length; i++){
                      questions = questions.concat(_res[i].questions);
                    }
              })
          })
        }
        var question = questions[Math.floor(Math.random() * questions.length)];
        console.log(questions)
        console.log(question)
        res.send(question);
        /*else{

          Area.find({'name': { $in: areas }})
          .populate( 'technologies', null, { name: { $in: techs } } )
          .exec(function(err, _res){
            Technology.find({'name': { $in: techs }})
            .populate( 'questions', null, { level: { $in: level } } )
            .exec(function(err, _res){

              for(var i = 0; i < _res.length; i++){
                questions = questions.concat(_res[i].questions);
              }

              var question = questions[Math.floor(Math.random() * questions.length)];
              res.send(question);
            })
          })
        }*/

    });




}
