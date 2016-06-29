var mongoose = require('mongoose');
mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

var Technology = require(__dirname+"/../models/Technology.js").Technology;
var Area = require(__dirname+"/../models/Area.js").Area;
var Question = require(__dirname+"/../models/Question.js").Question;
var User = require(__dirname+"/../models/User.js").User;

var question_1_javascript_beginner = new Question({
  "question": "Inside which HTML element do we put the JavaScript?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "<script>",
      "correct": true
    },
    {
      "text": "<javascript>",
      "correct": false
    },
    {
      "text": "<js>",
      "correct": false
    },
    {
      "text": "<scripting>",
      "correct": false
    }
  ]
});

var question_2_javascript_beginner = new Question({
  "question": "What is the correct JavaScript syntax to change the content of the HTML element below?",
  "code_sample": {
    "language": "html",
    "content": "<p id=\"demo\">This is a demonstration.</p>"
  },
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "#demo.innerHTML = 'Hello World!';",
      "correct": false
    },
    {
      "text": "document.getElement('p').innerHTML = 'Hello World!';",
      "correct": false
    },
    {
      "text": "document.getElementByName('p').innerHTML = 'Hello World!';",
      "correct": false
    },
    {
      "text": "document.getElementById('demo').innerHTML = 'Hello World!';",
      "correct": true
    }
  ]
});

var question_3_javascript_beginner = new Question({
  "question": "Where is the correct place to insert a JavaScript?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "The <body> section",
      "correct": false
    },
    {
      "text": "The <head> section",
      "correct": true
    },
    {
      "text": "Both the <head> section and the <body> section are correct",
      "correct": false
    }
  ]
});

var question_4_javascript_beginner = new Question({
  "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "<script href='xxx.js'>",
      "correct": false
    },
    {
      "text": "<script name='xxx.js'>",
      "correct": false
    },
    {
      "text": "<script src='xxx.js'>",
      "correct": true
    }
  ]
});

var question_5_javascript_beginner = new Question({
  "question": "The external JavaScript file must contain the <script> tag.",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "true",
      "correct": false
    },
    {
      "text": "false",
      "correct": true
    }
  ]
});

var question_6_javascript_beginner = new Question({
  "question": "How do you write 'Hello World' in an alert box?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "alert('Hello World');",
      "correct": true
    },
    {
      "text": "alertBox('Hello World');",
      "correct": false
    },
    {
      "text": "msg('Hello World');",
      "correct": false
    },
    {
      "text": "msgBox('Hello World');",
      "correct": false
    }
  ]
});

var question_7_javascript_intermediate = new Question({
  "question": "Number is a datatype in Javascript",
  "code_sample": null,
  "explanation": null,
  "level": 2,
  "answers": [
    {
      "text": "True",
      "correct": true
    },
    {
      "text": "False",
      "correct": false
    }
  ]
});

var question_8_javascript_intermediate = new Question({
  "question": "When evaluating 5 + \"cats\"...",
  "code_sample": null,
  "explanation": null,
  "level": 2,
  "answers": [
    {
      "text": "5 is automatically converted to a string",
      "correct": true
    },
    {
      "text": "\"cats\" is automatically converted to a string. It fails.",
      "correct": false
    },
    {
      "text": "Reference Error",
      "correct": false
    }
  ]
});

var question_9_javascript_expert = new Question({
  "question": "What will be the output of the code below?",
  "code_sample": {
    "language": "javascript",
    "content": "var trees = [\"xyz\",\"xxxx\",\"test\",\"ryan\",\"apple\"];\ndelete trees[3];\n  console.log(trees.length);"
  },
  "explanation": "When we use the delete operator to delete an array element, the array length is not affected from this. This holds even if you deleted all elements of an array using the delete operator.",
  "level": 3,
  "answers": [
    {
      "text": "5",
      "correct": true
    },
    {
      "text": "4",
      "correct": false
    },
    {
      "text": "3",
      "correct": false
    },
    {
      "text": "6",
      "correct": false
    }
  ]
});

var question_10_javascript_expert = new Question({
  "question": "\"\" == 0 returns what?",
  "code_sample": null,
  "explanation": null,
  "level": 3,
  "answers": [
    {
      "text": "true",
      "correct": true
    },
    {
      "text": "false",
      "correct": false
    },
    {
      "text": "Reference Error",
      "correct": false
    },
    {
      "text": "Not executed",
      "correct": false
    }
  ]
});

var question_11_postgres_beginner = new Question({
  "question": "Which SQL statement is used to extract data from a database?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "SELECT",
      "correct": true
    },
    {
      "text": "OPEN",
      "correct": false
    },
    {
      "text": "EXTRACT",
      "correct": false
    },
    {
      "text": "GET",
      "correct": false
    }
  ]
});

var question_12_postgres_beginner = new Question({
  "question": "With SQL, how do you select a column named \"FirstName\" from a table named \"Persons\"?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "SELECT FirstName FROM Persons",
      "correct": true
    },
    {
      "text": "SELECT Persons.FirstName",
      "correct": false
    },
    {
      "text": "EXTRACT FirstName FROM Persons",
      "correct": false
    }
  ]
});

var question_13_postgres_beginner = new Question({
  "question": "With SQL, how do you select all the records from a table named \"Persons\" where the value of the column \"FirstName\" starts with an \"a\"?",
  "code_sample": null,
  "explanation": null,
  "level": 1,
  "answers": [
    {
      "text": "SELECT * FROM Persons WHERE FirstName='a'",
      "correct": false
    },
    {
      "text": "SELECT * FROM Persons WHERE FirstName='%a%'",
      "correct": false
    },
    {
      "text": "SELECT * FROM Persons WHERE FirstName LIKE 'a%'",
      "correct": false
    },
    {
      "text": "SELECT * FROM Persons WHERE FirstName LIKE '%a'",
      "correct": true
    }
  ]
});

var question_14_postgres_intermediate = new Question({
  "question": "What are the different types of JOIN clauses?",
  "code_sample": null,
  "explanation": null,
  "level": 2,
  "answers": [
    {
      "text": "INNER JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL JOIN, CROSS JOIN",
      "correct": true
    },
    {
      "text": "SIMPLE JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL JOIN, EITHER JOIN",
      "correct": false
    }
  ]
});

var question_15_postgres_intermediate = new Question({
  "question": "What is wrong with the following query?",
  "code_sample": {
    "language": "sql",
    "content": "SELECT Id, YEAR(BillingDate) AS BillingYear\nFROM Invoices\nWHERE BillingYear >= 2010;"
  },
  "explanation": null,
  "level": 2,
  "answers": [
    {
      "text": "Nothing",
      "correct": false
    },
    {
      "text": "Sould be WHERE YEAR(BillingDate) >= 2010; instead",
      "correct": true
    }
  ]
});

var question_16_postgres_expert = new Question({
  "question": "What will be the result of the query below?",
  "code_sample": {
    "language": "sql",
    "content": "select case when null = null then 'Yup' else 'Nope' end as Result;"
  },
  "explanation": "This query will actually yield “Nope”, seeming to imply that null is not equal to itself! The reason for this is that the proper way to compare a value to null in SQL is with the is operator, not with =.",
  "level": 3,
  "answers": [
    {
      "text": "Yup",
      "correct": false
    },
    {
      "text": "Nope",
      "correct": true
    },
    {
      "text": "Error",
      "correct": false
    }
  ]
});

var question_17_postgres_expert = new Question({
  "question": "What are the ACID properties?",
  "code_sample": null,
  "explanation": null,
  "level": 3,
  "answers": [
    {
      "text": "Atomicity, Consistency, Isolation, Durability",
      "correct": true
    },
    {
      "text": "Adaptability, Computability, Invariability, Destructibility",
      "correct": false
    },
    {
      "text": "Adaptability, Consistency, Invariability, Disposability",
      "correct": false
    }
  ]
});

question_1_javascript_beginner.save();
question_2_javascript_beginner.save();
question_3_javascript_beginner.save();
question_4_javascript_beginner.save();
question_5_javascript_beginner.save();
question_6_javascript_beginner.save();
question_7_javascript_intermediate.save();
question_8_javascript_intermediate.save();
question_9_javascript_expert.save();
question_10_javascript_expert.save();
question_11_postgres_beginner.save();
question_12_postgres_beginner.save();
question_13_postgres_beginner.save();
question_14_postgres_intermediate.save();
question_15_postgres_intermediate.save();
question_16_postgres_expert.save();
question_17_postgres_expert.save();

var tech_javascript = new Technology({
    name: 'javascript',
    questions:[question_1_javascript_beginner._id, question_2_javascript_beginner._id, question_3_javascript_beginner._id,
              question_4_javascript_beginner._id, question_5_javascript_beginner._id, question_6_javascript_beginner._id,
              question_7_javascript_intermediate._id, question_8_javascript_intermediate._id,
              question_9_javascript_expert._id, question_10_javascript_expert._id]
});

var tech_postgres = new Technology({
    name: 'postgres',
    questions:[question_11_postgres_beginner._id, question_12_postgres_beginner._id, question_13_postgres_beginner._id,
              question_14_postgres_intermediate._id, question_15_postgres_intermediate._id,
              question_16_postgres_expert._id, question_17_postgres_expert._id]
});

tech_javascript.save(function (err, tech_javascript) {
    if (err) return console.error(err);
    else {
        Area.findOne({ _id: tech_javascript._id})
            .populate('questions')
            .exec(function(error, posts) {
            console.log(error)
            console.log(JSON.stringify(posts, null, "\t"))
        })
    }
});

tech_postgres.save(function (err, tech_postgres) {
    if (err) return console.error(err);
    else {
        Area.findOne({ _id: tech_postgres._id})
            .populate('questions')
            .exec(function(error, posts) {
            console.log(error)
            console.log(JSON.stringify(posts, null, "\t"))
        })
    }
});

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

area_databases.save(function (err, area_databases) {
    if (err) return console.error(err);
    else {
        Area.findOne({ _id: area_databases._id})
            .populate('technologies')
            .exec(function(error, posts) {
            console.log(error)
            console.log(JSON.stringify(posts, null, "\t"))
        })
    }
});
