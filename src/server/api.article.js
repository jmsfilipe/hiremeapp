module.exports = function(apiRoutes){
    var Article = require(__dirname+"/../models/Article.js").Article;

    // ARTICLES : API ROUTES -------------------

    //list the articles
    apiRoutes.get('/list_articles', function(req, res) {

        Article.find({}).exec(function(err, _res){
            res.send(_res);
        });

    });


}