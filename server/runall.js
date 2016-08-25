var mongoose = require('mongoose');
mongoose.connect('mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp');     // connect to mongoDB database on modulus.io

var Technology = require(__dirname+"/../models/Technology.js").Technology;
var Area = require(__dirname+"/../models/Area.js").Area;
var Question = require(__dirname+"/../models/Question.js").Question;
var User = require(__dirname+"/../models/User.js").User;
var Article = require(__dirname+"/../models/Article.js").Article;
var Company = require(__dirname+"/../models/Company.js").Company;
var General = require(__dirname+"/../models/General.js").General;

var user_2 = new User({
    name: 'Carina',
    friends: [],
    password: '000000',
    score: 0,
    email: 'carina@gmail.com',
    gender: 'F'
});

var user_3 = new User({
    name: 'André',
    friends: [],
    password: '000000',
    score: 0,
    email: 'andre@gmail.com',
    gender: 'M'
});

var user_4 = new User({
    name: 'Joana',
    friends: [],
    password: '000000',
    score: 0,
    email: 'joana@gmail.com',
    gender: 'F'
});

var user_5 = new User({
    name: 'Maria',
    friends: [],
    password: '000000',
    score: 0,
    email: 'maria@gmail.com',
    gender: 'F'
});

var user_6 = new User({
    name: 'Miguel',
    friends: [],
    password: '000000',
    score: 0,
    email: 'miguel@gmail.com',
    gender: 'M'
});

var user_7 = new User({
    name: 'Teste',
    friends: [],
    password: '123a<',
    score: 0,
    email: 'teste@mail.com',
    gender: 'M'
});

user_2.save();
user_3.save();
user_4.save();
user_5.save();
user_6.save();
user_7.save();

var user_1 = new User({
    name: 'Jorge',
    friends: [user_2._id, user_3._id, user_4._id],
    password: '000000',
    score: 0,
    email: 'jmsfilipe@gmail.com',
    gender: 'M'
});

user_1.save();

var article_1 = new Article({
    title: "Empresa de informática oferece mais dois meses de licença de maternidade",
    body: "No caso da Critical Software o alargamento enquadra-se na política de responsabilidade social da empresa. Três por cento dos lucros são dedicados a este fim, explica",
    img: "https://imagens3.publico.pt/imagens.aspx/1035503?tp=UH&db=IMAGENS",
    link: "https://www.publico.pt/sociedade/noticia/empresa-de-informatica-oferece-as-funcionarias-mais-dois-meses-de-licenca-de-maternidade-1725237"
    source: "Público",
    date: "06/03/2016"
});

var article_2 = new Article({
    title: "Salários de profissionais de tecnologias crescem 2% em 2015",
    body: "Em média, os salários dos profissionais de tecnologias registaram um aumento menor em 2015 do que em 2014. Estudo com 12 mil entrevistas revela que quase um terço das empresas de tecnologias portuguesas está em vias de contratar profissionais.",
    img: "http://images-cdn.impresa.pt/exameinformatica/2015-07-27-2ndS-pix1.jpg?v=w620h395",
    link: "http://exameinformatica.sapo.pt/noticias/mercados/2015-07-27-Salarios-de-profissionais-de-tecnologias-crescem-2-em-2015",
    source: "Exame Informática",
    date: "27/07/2015"
});

var article_3 = new Article({
    title: "Empresas recrutam todos os informáticos saídos da Universidade do Minho",
    body: "Todos os cerca de 150 alunos finalistas e recém-licenciados da Universidade do Minho na área da informática e Ciências de Computação vão ser disputados, na próxima semana, por mais de vinte empresas portuguesas e multinacionais.",
    img: "http://www.crup.pt/images/M_images/UMInho.JPG",
    link: "http://www.sabado.pt/ultima_hora/detalhe/empresas_recrutam_todos_os_informaticos_saidos_da_universidade_do_minho.html"
    source: "Sábado",
    date: "09/06/2016"
});

var article_4 = new Article({
    title: "Português recomendado por Bill Gates:\"Os computadores são demasiado estúpidos\"",
    body: "As máquinas não vão \"destruir a humanidade\" mas há perigos. O aviso é de Pedro Domingos, autor do livro que Bill Gates recomenda a quem quer saber mais sobre Inteligência Artificial.",
    img: "http://static.globalnoticias.pt/storage/TSF/2016/sectionbig/ng7055596.jpg",
    link: "http://www.tsf.pt/sociedade/ciencia-e-tecnologia/interior/pedro-domingos-os-computadores-sao-demasiado-estupidos-5231986.html",
    source: "TSF",
    date: "16/06/2016"
});

var article_5 = new Article({
    title: "Uniplaces tem 40 vagas por preencher",
    body: "Portugal, Espanha, Alemanha, França e Itália são os mercados em que a Uniplaces quer expandir a sua presença e, para isso, precisa de pessoas com experiência. Mas, em vez de colocar um anúncio no jornal, a startup portuguesa recorreu a drones para anunciar as 40 vagas que tem disponíveis nas áreas de Customer Service, Marketing, Onboarding, People&Finance, Product, Sales e Technology.",
    img: "http://marketeer.pt/wp-content/uploads/2016/06/uniplaces-drone.jpg",
    link: "http://marketeer.pt/2016/06/20/uniplaces-tem-40-vagas-por-preencher/"
    source: "Marketeer",
    date: "20/06/2016"
});

article_1.save();
article_2.save();
article_3.save();
article_4.save();
article_5.save();

var question_1_javascript_beginner = new Question({
    "question": ['Inside which HTML element do we put the JavaScript?', 'Dentro de que elemento HTML se coloca o Javascript?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['<script>', '<script>'],
            "correct": true
        },
        {
            "text": ['<javascript>', '<javascript>'],
            "correct": false
        },
        {
            "text": ['<js>', '<js>'],
            "correct": false
        },
        {
            "text": ['<scripting>', '<scripting>'],
            "correct": false
        }
    ]
});

var question_2_javascript_beginner = new Question({
    "question": ['What is the correct JavaScript syntax to change the content of the HTML element below?', 'Qual é a sintaxe em Javascript para o conteúdo do elemento HTML em baixo?'],
    "code_sample": {
        "language": "html",
        "content": "<p id=\"demo\">This is a demonstration.</p>"
    },
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['#demo.innerHTML = \'Hello World!\';','#demo.innerHTML = \'Hello World!\';'],
            "correct": false
        },
        {
            "text": ['document.getElement(\'p\').innerHTML = \'Hello World!\';','document.getElement(\'p\').innerHTML = \'Hello World!\';'],
            "correct": false
        },
        {
            "text": ['document.getElementByName(\'p\').innerHTML = \'Hello World!\';','document.getElementByName(\'p\').innerHTML = \'Hello World!\';'],
            "correct": false
        },
        {
            "text": ['document.getElementById(\'demo\').innerHTML = \'Hello World!\';','document.getElementById(\'demo\').innerHTML = \'Hello World!\';'],
            "correct": true
        }
    ]
});

var question_3_javascript_beginner = new Question({
    "question": ['Where is the correct place to insert a JavaScript?', 'Qual é o sítio correcto para inserir Javascript?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['The <body> section', 'A secção <body>'],
            "correct": false
        },
        {
            "text": ['The <head> section', 'A secção <head>'],
            "correct": true
        },
        {
            "text": ['Both the <head> section and the <body> section are correct', 'Ambas as secções <head> e <body> estão correctas'],
            "correct": false
        }
    ]
});

var question_4_javascript_beginner = new Question({
    "question": ['What is the correct syntax for referring to an external script called \'xxx.js\'?', 'Qual é a sintaxe correcta para referenciar um script externo chamado \'xxx.js\'?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['<script href=\'xxx.js\'>','<script href=\'xxx.js\'>'],
            "correct": false
        },
        {
            "text": ['<script name=\'xxx.js\'>','<script name=\'xxx.js\'>'],
            "correct": false
        },
        {
            "text":  ['<script src=\'xxx.js\'>','<script src=\'xxx.js\'>'],
            "correct": true
        }
    ]
});

var question_5_javascript_beginner = new Question({
    "question": ['The external JavaScript file must contain the <script> tag.', 'Um ficheiro externo de Javascript tem de ter a tag <script>'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['true', 'verdadeiro'],
            "correct": false
        },
        {
            "text": ['false', 'falso'],
            "correct": true
        }
    ]
});

var question_6_javascript_beginner = new Question({
    "question": ['How do you write \'Hello World\' in an alert box?', 'Como se escreve \'Hello World\' numa alert box?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['alert(\'Hello World\');','alert(\'Hello World\');'],
            "correct": true
        },
        {
            "text": ['alertBox(\'Hello World\');','alertBox(\'Hello World\');'],
            "correct": false
        },
        {
            "text": ['msg(\'Hello World\');','msg(\'Hello World\');'],
            "correct": false
        },
        {
            "text": ['msgBox(\'Hello World\');','msgBox(\'Hello World\');'],
            "correct": false
        }
    ]
});

var question_7_javascript_intermediate = new Question({
    "question": ["Number is a datatype in Javascript.", "Number é um tipo de dados em Javascript."],
    "code_sample": null,
    "explanation": null,
    "level": 2,
    "answers": [
        {
            "text": ["True", "Verdadeiro"],
            "correct": true
        },
        {
            "text": ["False", "Falso"],
            "correct": false
        }
    ]
});

var question_8_javascript_intermediate = new Question({
    "question": ["When evaluating 5 + \"cats\"...", "Quando de avalia 5 + \"cats\"..."],
    "code_sample": null,
    "explanation": null,
    "level": 2,
    "answers": [
        {
            "text": ["5 is automatically converted to a string", "5 é automaticamente convertido numa string"],
            "correct": true
        },
        {
            "text": ["\"cats\" is automatically converted to a string. It fails.", "\"cats\" é automaticamente convertido numa string. Falha."],
            "correct": false
        },
        {
            "text": ["Reference Error", "Reference Error"],
            "correct": false
        }
    ]
});

var question_9_javascript_expert = new Question({
    "question": ["What is the difference between == and === ?", "Qual é a diferença entre == e === ?"],
    "code_sample": null,
    "explanation": null,
    "level": 3,
    "answers": [
        {
            "text": ["\'==\' evaluates equality of the value, while \'===\' evaluates  equality of type and value.", "\'==\' avalia o valor, enquanto \'===\' avalia o tipo e o valor."],
            "correct": true
        },
        {
            "text": ["\'===\' evaluates equality of the value, while \'==\' evaluates  equality of type and value.", "\'===\' avalia o valor, enquanto \'==\' avalia o tipo e o valor."],
            "correct": false
        }
    ]
});

var question_10_javascript_expert = new Question({
    "question": ["\"\" == 0 returns what?", "O que retorna \"\" == 0 ?"],
    "code_sample": null,
    "explanation": null,
    "level": 3,
    "answers": [
        {
            "text": ["true", "true"],
            "correct": true
        },
        {
            "text": ["false", "false"],
            "correct": false
        },
        {
            "text": ["Reference Error", "Reference Error"],
            "correct": false
        },
        {
            "text": ["Not executed", "Not executed"],
            "correct": false
        }
    ]
});

var question_11_postgres_beginner = new Question({
    "question": ['Which SQL statement is used to extract data from a database?','Que expressão SQL é usada para extrair dados da base de dados?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['SELECT', 'SELECT'],
            "correct": true
        },
        {
            "text": ['OPEN', 'OPEN'],
            "correct": false
        },
        {
            "text": ['EXTRACT', 'EXTRACT'],
            "correct": false
        },
        {
            "text": ['GET', 'GET'],
            "correct": false
        }
    ]
});

var question_12_postgres_beginner = new Question({
    "question": ['With SQL, how do you select a column named "FirstName" from a table named "Persons"?', 'Com SQL, como se selecciona uma coluna chamada "FirstName" de uma tabela chamada "Persons"?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['SELECT FirstName FROM Persons', 'SELECT FirstName FROM Persons'],
            "correct": true
        },
        {
            "text": ['SELECT Persons.FirstName', 'SELECT Persons.FirstName'],
            "correct": false
        },
        {
            "text": ['EXTRACT FirstName FROM Persons','EXTRACT FirstName FROM Persons'],
            "correct": false
        }
    ]
});

var question_13_postgres_beginner = new Question({
    "question": ['With SQL, how do you select all the records from a table named "Persons" where the value of the column "FirstName" starts with an "a"?','Com SQL, como se seleccionam todos os resultados de uma tabela chamada "Persons" onde o valor da coluna "FirstName" começa com um "a"?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['SELECT * FROM Persons WHERE FirstName=\'a\'', 'SELECT * FROM Persons WHERE FirstName=\'a\''],
            "correct": false
        },
        {
            "text": ['SELECT * FROM Persons WHERE FirstName=\'%a%\'','SELECT * FROM Persons WHERE FirstName=\'%a%\''],
            "correct": false
        },
        {
            "text": ['SELECT * FROM Persons WHERE FirstName LIKE \'a%\'','SELECT * FROM Persons WHERE FirstName LIKE \'a%\''],
            "correct": false
        },
        {
            "text": ['SELECT * FROM Persons WHERE FirstName LIKE \'%a\'','SELECT * FROM Persons WHERE FirstName LIKE \'%a\''],
            "correct": true
        }
    ]
});

var question_14_postgres_intermediate = new Question({
    "question": ['What are the different types of JOIN clauses?','Quais são os diferentes tipos de JOIN?'],
    "code_sample": null,
    "explanation": null,
    "level": 2,
    "answers": [
        {
            "text": ["INNER JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL JOIN, CROSS JOIN", "INNER JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL JOIN, CROSS JOIN"],
            "correct": true
        },
        {
            "text": ["SIMPLE JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL JOIN, EITHER JOIN", "SIMPLE JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, FULL JOIN, EITHER JOIN"],
            "correct": false
        }
    ]
});


var question_15_postgres_expert = new Question({
    "question": ["What are the ACID properties?", "Quais são as propriedades ACID?"],
    "code_sample": null,
    "explanation": null,
    "level": 3,
    "answers": [
        {
            "text": ["Atomicity, Consistency, Isolation, Durability","Atomicity, Consistency, Isolation, Durability"],
            "correct": true
        },
        {
            "text": ["Adaptability, Computability, Invariability, Destructibility","Adaptability, Computability, Invariability, Destructibility"],
            "correct": false
        },
        {
            "text": ["Adaptability, Consistency, Invariability, Disposability","Adaptability, Consistency, Invariability, Disposability"],
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
question_15_postgres_expert.save();

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
               question_14_postgres_intermediate._id,
               question_15_postgres_expert._id]
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

var company_google = new Company({
    name: 'Google',
    questions:[question_1_javascript_beginner._id, question_2_javascript_beginner._id]
});

var company_yahoo = new Company({
    name: 'Yahoo',
    questions:[question_3_javascript_beginner._id, question_4_javascript_beginner._id]
});

var company_microsoft = new Company({
    name: 'Microsoft',
    questions:[question_5_javascript_beginner._id, question_6_javascript_beginner._id]
});

var company_outsystems = new Company({
    name: 'Outsystems',
    questions:[question_7_javascript_intermediate._id, question_8_javascript_intermediate._id]
});

var company_adobe = new Company({
    name: 'Adobe',
    questions:[question_14_postgres_intermediate._id, question_15_postgres_expert._id]
});

company_google.save();
company_yahoo.save();
company_microsoft.save();
company_outsystems.save();
company_adobe.save();

var question_1_windows = new Question({
    "question": ['What is the most common way to uninstall a program?', 'Qual é a maneira mais fácil de desisntalar um programa?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['Open the program, then start searching for the uninstall button.', 'Abrir o programa e começar a procurar pelo botão de desinstalar.'],
            "correct": false
        },
        {
            "text": ['Delete the program folder.','Apagar a pasta do programa.'],
            "correct": false
        },
        {
            "text": ['Search for the program in "Programs and Features", in the Control Panel.','Procurar pelo programa em "Programs and Features", no Painel de Controlo.'],
            "correct": true
        }
    ]
});

var question_1_word = new Question({
    "question": ['Line spacing is done by line breaking after each sentence.', 'O espaçamento de linhas é feito dando "enter" depois de cada frase.'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['true', 'verdadeiro'],
            "correct": false
        },
        {
            "text": ['false', 'falso'],
            "correct": true
        }
    ]
});

var question_1_excel = new Question({
    "question": ['What function displays row data in a column or column data in a row?', 'Que função mostra dados de uma linha numa coluna ou dados de coluna numa linha?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['Hyperlink', 'Hyperlink'],
            "correct": false
        },
        {
            "text": ['Index', 'Index'],
            "correct": false
        },
        {
            "text": ['Transpose', 'Transpose'],
            "correct": true
        },
        {
            "text": ['Rows', 'Rows'],
            "correct": false
        }
    ]
});

var question_1_powerpoint = new Question({
    "question": ['Which short cut key inserts a new slide in current presentation?', 'Qual é o atalho para inserir um novo diapositivo na apresentação?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['Ctrl + N', 'Ctrl + N'],
            "correct": false
        },
        {
            "text": ['Ctrl + M', 'Ctrl + M'],
            "correct": true
        },
        {
            "text": ['Ctrl + S', 'Ctrl + S'],
            "correct": false
        },
        {
            "text": ['All of the aboce', 'Todas as anteriores'],
            "correct": false
        }
    ]
});

var question_1_gmail = new Question({
    "question": ['How do you send mail to people without showing their email addresses?','Como é que se envia um email sem mostrar aos outros o seu próprio endereço?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['Add Cc', 'Adicionar Cc'],
            "correct": false
        },
        {
            "text": ['Add to', 'Adicionar para'],
            "correct": false
        },
        {
            "text": ['Add Bcc', 'Adicionar Bcc'],
            "correct": true
        }
    ]
});

var question_1_chrome = new Question({
    "question": ['On Windows, what is the shortcut to open a new window in Chrome?','No windows, qual é o atalho para abrir uma nova janela no Chrome?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['Ctrl + n', 'Ctrl + n'],
            "correct": true
        },
        {
            "text": ['Shift + n', 'Shift + n'],
            "correct": false
        },
        {
            "text": ['Alt + n', 'Alt + n'],
            "correct": false
        }
    ]
});

var question_1_android = new Question({
    "question": ['What is the \'playstore\' app?','O que é a aplicação \'playstore\'?'],
    "code_sample": null,
    "explanation": null,
    "level": 1,
    "answers": [
        {
            "text": ['An application in which you can play videos.', 'Uma aplicação onde se podem reproduzir vídeos.'],
            "correct": false
        },
        {
            "text": ['An application for GPS navigation.', 'Uma aplicação para navegação GPS.'],
            "correct": false
        },
        {
            "text": ['An official Google application, in which you can search for and install new apps.', 'Uma aplicação oficial da Google, em que se pode procurar e instalar outras aplicações.'],
            "correct": true
        }
    ]
});

question_1_windows.save();
question_1_word.save();
question_1_excel.save();
question_1_powerpoint.save();
question_1_gmail.save();
question_1_chrome.save();
question_1_android.save();

var general_windows = new General({
    name: 'Windows',
    questions:[question_1_windows._id]
});

var general_word = new General({
    name: 'Word',
    questions:[question_1_word._id]
});

var general_excel = new General({
    name: 'Excel',
    questions:[question_1_excel._id]
});

var general_powerpoint = new General({
    name: 'Powerpoint',
    questions:[question_1_powerpoint._id]
});

var general_gmail = new General({
    name: 'Gmail',
    questions:[question_1_gmail._id]
});

var general_chrome = new General({
    name: 'Chrome',
    questions:[question_1_chrome._id]
});

var general_android = new General({
    name: 'Android',
    questions:[question_1_android._id]
});


general_windows.save();
general_word.save();
general_excel.save();
general_powerpoint.save();
general_gmail.save();
general_chrome.save();
general_android.save();

console.log('runall ---- DONE TASK');
