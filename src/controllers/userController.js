
var User = require(__dirname+"/../models/User.js").User;

module.exports = {
    createUser: function(req,res) {
        user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
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


    },
    getUser: function(req,res) {

        User.find({ email: req.query.email}).count(function(err, count){

            if (err) {
                // Some other error
                return res.status(500).send(err);
            }
            if(count == 0){
                return res.status(204).send("User not found.") //NO CONTENT
            }
            else{

                User.findOne({ email: req.query.email, password: req.query.pw }, function(err, user) {

                    if (err) {
                        return res.status(500).send(err);
                    }
                    if(!user){
                        return res.status(401).send("Wrong password!") // FORBIDDEN
                    }

                    //200 OK
                    res.json({
                        success: true,
                        result: user
                    });
                });
            }
        });


    },
    validateAccount: function(req,res) {
        User.find({ email: req.query.email}).count(function(err, count){

           if (err) {
                // Some other error
                return res.status(500).send(err);
            }
            res.json({
                valid : (count === 1)
            });
        });

    },
    validateSignup: function(req,res) {
        User.find({ email: req.query.email}).count(function(err, count){

            if (err) {
                // Some other error
                return res.status(500).send(err);
            }
            res.json({
                valid : (count === 0)
            });
        });

    },
};