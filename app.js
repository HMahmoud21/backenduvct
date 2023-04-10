var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const mysql=require("mysql");
const session =require("express-session");
const FileUpload = require("express-fileupload");

var flash = require('express-flash');
//const SequelizeStore=require("connect-session-sequelize");
//const db= require ("./config/db");
var port = process.env.PORT || 5000
var app = express()
const dotenv =require("dotenv").config();



app.use(session({ 
  secret: '123458cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  secure: 'auto'
}))

// enregistrer des message de la session 

app.use(flash());
app.use(FileUpload());
app.use(express.static("public"));

app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000', "preflightContinue":true, "optionsSuccessStatus":200, credentials:true
}));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-control-request-methods,access-control-allow-origin');

  res.header("X-Requested-With", "XMLHttpRequest");

  // Set to true if you need the we
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
})

app.options("http://localhost:3000", cors())


//requte f postman

var router = require('./routes/UserRoute')
//var formateurcandidat=require('./routes/Formateur')
//var instructeur=require('./routes/instructeur')
//var apprenant=require('./routes/Apprenant')
var formation=require('./routes/FormationRoute');
var evenement=require('./routes/Evenement')
//var categorie=require('./routes/Categorie')
var upload=require("./routes/uplod")
//var souscategorie=require("./routes/souscategorie")
var section=require("./routes/section");
var Session=require("./routes/sessionRoute")

app.use('/users', router);
//app.use('/formateurcandidat',formateurcandidat);
//app.use('/instructeur',instructeur);
//app.use('/apprenant',apprenant);
app.use('/formation',formation);
app.use('/event',evenement);
//app.use('/cat',categorie);
app.use('/upload',upload);
//app.use("/souscategorie",souscategorie)
app.use("/section",section);
app.use("/sessions",Session)





app.use("/uploads",express.static("./uploads"))

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})