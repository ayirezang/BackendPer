const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authorization = (req, res, next) => {
  try {
    // extract authorization  from the  header
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      return res.json({ message: "unauthorized" });
    }
    //extract the token from header
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.json({ message: "unathorized,token format is invalid" });
    }

    //verify token with secretkey
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "unauthorized,token invalid" });
    }
    const user = userModel.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // attach user without password to req
    next();
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "unauthorized, token invalid" });
  }
};

module.exports = Authorization;
