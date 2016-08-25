var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
    title: String,
    body: String,
    img: String,
    link: String
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = {
    Article: Article
}
