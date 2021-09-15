const express = require("express");
const cors  = require("cors");
const bodyParser = require("body-parser");
const main = express();

var usersRouter = require('./routes/Metodos');
var server = require('./routes/server')


main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/', usersRouter);
main.use('/', server);

module.exports = main;