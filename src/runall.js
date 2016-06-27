var mongoose = require('mongoose');
mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

var Technology = require(__dirname+"/models/technology").Technology;
var Area = require(__dirname+"/models/area").Area;
var Level = require(__dirname+"/models/level").Level;
var Question = require(__dirname+"/models/question").Question;
var User = require(__dirname+"/models/user").User;

var tech = new Technology({ 
    name: 'tech-fluffy2'
});

tech.save(function (err, fluffy) {
    if (err) return console.error(err);
});

var fluffy = new Area({ 
    name: 'fluffy-new',
    technologies:[tech._id]

});

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    else {
        Area.findOne({ _id: fluffy._id})
            .populate('technologies')
            .exec(function(error, posts) {
            console.log(error)
            console.log(JSON.stringify(posts, null, "\t"))
        })
    }
});