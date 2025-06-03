// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const Authorization = (req, res, next) => {
//   try {
//     // extract authorization  from the  header
//     const authorizationHeader = req.get("Authorization");
//     if (!authorizationHeader) {
//       return res.json({ message: "unauthorized" });
//     }
//     //extract the token from header
//     const token = authorizationHeader.split(" ")[1];
//     if (!token) {
//       return res.json({ message: "unathorized,token format is invalid" });
//     }

//     //verify token with secretkey
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     if (!decodedToken) {
//       return res.status(401).json({ message: "unauthorized,token invalid" });
//     }
//     // attach user without password to req

//     next();
//   } catch (error) {
//     console.log(error.message);
//     return res.status(401).json({ message: "unauthorized, token invalid" });
//   }
// };

// module.exports = Authorization;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authorization = (req, res, next) => {
  try {
    // Extract authorization from the header
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "unauthorized no token provided" });
    }

    // Extract the token from header (expecting "Bearer <token>" format)
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized - token format is invalid" });
    }

    // Verify token with secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user ID to request object for use in subsequent middleware/routes
    req.userId = decodedToken.id;

    // Token is valid, continue to next middleware/route
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({ message: "unauthorized - token invalid" });
  }
};

module.exports = Authorization;
