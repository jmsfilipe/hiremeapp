module.exports = function(apiRoutes){

    var Question = require(__dirname+"/../models/Question.js").Question;
    var Technology = require(__dirname+"/../models/Technology.js").Technology;
    var Area = require(__dirname+"/../models/Area.js").Area;
    var Company = require(__dirname+"/../models/Company.js").Company;
    var General = require(__dirname+"/../models/General.js").General;

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

    //list all technologies
    apiRoutes.get('/list_technologies', function(req, res) {

        Technology.find({}).exec(function(err, _res){
            res.send(_res);
        });
    });

    //list all general
    apiRoutes.get('/list_general', function(req, res) {

        General.find({}).exec(function(err, _res){
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

        var getQuestions = function(){


            //filtered by company
            Company.find({ name: { $in: companies } })
                .populate('questions')
                .exec(function(err, _res){
                for(var i = 0; i < _res.length; i++){
                    questions = questions.concat(_res[i].questions);
                }

                getGeneral();
            })

        }

        var getGeneral = function(){

            //filtered by general
            General.find({ name: { $in: general } })
                .populate('questions')
                .exec(function(err, _res){
                for(var i = 0; i < _res.length; i++){
                    questions = questions.concat(_res[i].questions);
                }

                getTechs();
            })

        }

        //filtered by techs
        var getTechs = function(){
            Area.find()
                .populate( 'technologies', null, { name: { $in: techs } } )
                .exec(function(err, _res){
                Technology.find({'name': { $in: techs }})
                    .populate( 'questions', null, { level: { $in: level } } )
                    .exec(function(err, _res){
                    for(var i = 0; i < _res.length; i++){
                        questions = questions.concat(_res[i].questions);
                    }

                    getAreas();
                })
            })
        }

        //filtered by Area
        var getAreas = function(){
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

                    getFinalQuestion();
                })
            })
        }

        var getFinalQuestion = function(){
            var question = questions[Math.floor(Math.random() * questions.length)];
            res.send(question);
        }

        //no filters
        if(companies.length == 0 && areas.length == 0 && techs.length == 0 && general.length == 0){

            Technology.find()
                .populate( 'questions', null, { level: { $in: level } } )
                .exec(function(err, _res){

                for(var i = 0; i < _res.length; i++){
                    questions = questions.concat(_res[i].questions);
                }

                var question = questions[Math.floor(Math.random() * questions.length)];
                res.send(question);
            })

        }

        else getQuestions();









    });




}
