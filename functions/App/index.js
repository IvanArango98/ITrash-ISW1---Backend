const express = require("express");
const cors  = require("cors");
const bodyParser = require("body-parser");
const main = express();

var usersRouter = require('./routes/Metodos');
var server = require('./routes/server')
var login = require('./routes/Login')



main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/', usersRouter);
main.use('/', server);
main.use('/', login);

module.exports = main;