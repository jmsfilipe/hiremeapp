module.exports = function(apiRoutes, jwt, app){

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
                console.log(err);
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.json({ success: false, code: "DuplicatedUser", message: 'Email already exist!' });
                }

                //TODO - rest of verifications server side

                // Some other error
                return res.status(500).send(err);
            }

            else{
                // create a token
                var token = jwt.sign({ name: user.name, email: user.email }, app.get('superSecret'), {
                    expiresIn : '1440m'// expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    jwt: token,
                    user: user
                });
            }

        });

    });

    //   verifyEmailAvailable
    apiRoutes.get('/signup/validator',  function(req, res) {
        User.find({ email: { $regex: new RegExp("^" + req.query.email.toLowerCase() + '$', "i") }}).count(function(err, count){

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
        User.find({ email: { $regex: new RegExp("^" + req.query.email.toLowerCase()  + '$', "i") }}).count(function(err, count){

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