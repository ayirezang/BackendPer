//week 4 presona create a bank,update a bank,delete
//  a bank,access a list of banks created,bank account number

//import server ,body-parser

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/account");
const bankRoutes = require("./routes/bank");
const userRoutes = require("./routes/user");
require("dotenv").config();

const { body } = require("express-validator");

//create server instance
const server = express();

//middleware
server.use(bodyParser.json());
server.use(accountRoutes);
server.use(bankRoutes);
server.use(userRoutes);

//routes

//view bank

//request handlers/controllers
//connect database to and start the srver 2 parameters
//  1 url (connects to the cloud infrastructure) 2 url(dataabase we want to conec tnto )
//method to connect
mongoose
  .connect(process.env.MONGO_DB)
  .then((result) => {
    server.listen(3000, () => console.log("server is here"));
  })
  .catch((err) => console.log(err));
