module.exports = function(app, express, mongoose, jwt){

    var User = require(__dirname+"/../models/User.js").User;

    // API ROUTES -------------------

    // get an instance of the router for api routes
    var apiRoutes = express.Router(); 

    // unauthenticated related routes
    require('./api.unauthenticated.js')(apiRoutes);


    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    apiRoutes.post('/authenticate', function(req, res) {

        console.log(req.body.email);

        // find the user
        User.findOne({
            email: req.body.email
        }, function(err, user) {

            if (err) 
                return res.status(500).send(err);


            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
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

            }

        });
    });

    // route middleware to verify a token
    apiRoutes.use(function(req, res, next) {


        if(req.get('Authorization') && req.get('Authorization').split("Bearer ")[1]){
            var token = req.get('Authorization').split("Bearer ")[1];
        }


        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
                if (err) {
                    return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;    
                    next();
                }
            });

        }
        else {

            // if there is no token
            // return an error
            return res.status(401).send({ 
                success: false, 
                message: 'No token provided.' 
            });

        }
    });

    // route to show a random message (GET http://localhost:8080/api/)
    apiRoutes.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });


    // user related routes
    require('./api.user.js')(apiRoutes);

    // game related routes
    require('./api.game.js')(apiRoutes);


    // article related routes
    require('./api.article.js')(apiRoutes);



    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);



}