//module to import http
const express = require("express");
const server = express();

//function to handle incoming request
//request obj contains infor abt incoming req

//create a server  execute the function when it recieves a request
// const server = http.createServer(handleAllRequests);
//replace this with hte express server

const handleHomeRequest = (req, res) => {
  res.send("<h1>hey you</h1>");
};

const handleProfileRequest = (req, res) => {
  res.send("<h2>mamam mamam</h2>");
};
const handleLoginRequest = (req, res) => {
  res.send("<h3>hello you there</h3>");
};

server.use("/profile", handleProfileRequest);
server.use("/login", handleLoginRequest);
server.use("/", handleHomeRequest);

// listen to resquest
server.listen(3000, "127.0.0.1", () => console.log("server is ready"));
