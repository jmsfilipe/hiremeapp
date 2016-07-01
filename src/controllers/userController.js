
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


    }
};