var mongoose = require('mongoose');
mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

var Technology = require(__dirname+"/../models/Technology.js").Technology;
var Area = require(__dirname+"/../models/Area.js").Area;
var Level = require(__dirname+"/../models/Level.js").Level;
var Question = require(__dirname+"/../models/Question.js").Question;
var User = require(__dirname+"/../models/User.js").User;

var tech_javascript = new Technology({
    name: 'javascript'
});

var tech_postgres = new Technology({
    name: 'postgres'
});

tech_javascript.save();
tech_postgres.save();

var area_web = new Area({
    name: 'web',
    technologies:[tech_javascript._id]
});

var area_databases = new Area({
    name: 'databases',
    technologies:[tech_postgres._id]
});

area_web.save(function (err, area_web) {
    if (err) return console.error(err);
    else {
        Area.findOne({ _id: area_web._id})
            .populate('technologies')
            .exec(function(error, posts) {
            console.log(error)
            console.log(JSON.stringify(posts, null, "\t"))
        })
    }
});
