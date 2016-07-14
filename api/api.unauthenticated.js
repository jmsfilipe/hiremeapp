module.exports = function(apiRoutes){

    var User = require(__dirname+"/../models/User.js").User;

    // USER : API ROUTES -------------------

    //create user
    apiRoutes.post('/user/new', function(req, res) {
        user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email.toLowerCase()
        }).save(function(err, user) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(500).send({ success: false, message: 'Email already exist!' });
                }

                // Some other error
                return res.status(500).send(err);
            }

            res.json({
                success: true
            });

        });

    });

    //   verifyEmailAvailable
    apiRoutes.get('/signup/validator',  function(req, res) {
        User.find({ "email": { $regex: new RegExp("^" + req.query.email.toLowerCase(), "i") }}).count(function(err, count){

            if (err) {
                // Some other error
                return res.status(500).send(err);
            }
            res.json({
                valid : (count === 0)
            });
        });
    });

    apiRoutes.get('/login/validator',  function(req, res) {
        User.find({ "email": { $regex: new RegExp("^" + req.query.email.toLowerCase(), "i") }}).count(function(err, count){

            if (err) {
                // Some other error
                return res.status(500).send(err);
            }
            res.json({
                valid : (count === 1)
            });
        });
    });
    
    




}