//week 4 presona create a bank,update a bank,delete
//  a bank,access a list of banks created,bank account number

//import server ,body-parser

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/account");
const bankRoutes = require("./routes/bank");

const { body } = require("express-validator");

//create server instance
const server = express();

//middleware
server.use(bodyParser.json());
server.use(accountRoutes);
server.use(bankRoutes);

//routes

//view bank

//request handlers/controllers
//connect database to and start the srver 2 parameters
//  1 url (connects to the cloud infrastructure) 2 url(dataabase we want to conec tnto )
//method to connect
mongoose
  .connect(
    "mongodb+srv://bankUser:amour@cluster0.9opkdne.mongodb.net/bankUser?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    server.listen(3000, () => console.log("server is here"));
  })
  .catch((err) => console.log(err));
