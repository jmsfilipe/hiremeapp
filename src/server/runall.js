var mongoose = require('mongoose');
mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

var Technology = require(__dirname+"/../models/technology").Technology;
var Area = require(__dirname+"/../models/area").Area;
var Level = require(__dirname+"/../models/level").Level;
var Question = require(__dirname+"/../models/question").Question;
var User = require(__dirname+"/../models/user").User;

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
