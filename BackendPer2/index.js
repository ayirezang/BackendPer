//week 3

const express = require("express");
const path = require("path"); //path module to find file
const bodyParser = require("body-parser");
const server = express();

//middleware
const loginRequestHandler = (req, res) => {
  console.log(req.body); //console.log(req.body.email),console.log
  res.send("done");
};

// middleware definition
server.use(express.static(path.join(__dirname, "public")));
server.use(bodyParser.urlencoded());

server.post("/login", loginRequestHandler);
server.listen(3000, () => console.log("aller togo"));
//week 2
// const express = require("express");
// const server = express();

// const handleAllRequests = () => {
//   res.send("hey hey");
// };
// const handleLoginRequest = (req, res) => {
//   res.send("login");
// };
// //general middleware
// const middlewarefunction = (req, res, next) => {
//   console.log("mamammie");
//   next();
// };
// // specic middlewaare
// const loginMiddleware = (req, res, next) => {
//   console.log("login middleware");
//   next();
// };
// //middleware
// // server.use(middlewarefunction);
// //routes
// server.post("/profile", handleAllRequests);
// server.get("/login", loginMiddleware, handleLoginRequest);
// server.put("/profile", (req, res) => res.send("hey papap"));

// server.listen(3000, () => console.log("server is here"));
