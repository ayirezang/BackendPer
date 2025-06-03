const express = require("express");
const userModel = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Added missing import

//signup
const signUp = async (req, res) => {
  try {
    //validation checks
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      return res.json({ message: error.array()[0].msg });
    }

    //get info from the req body
    const { Username, email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }

      //check if the username already exists
      const existingUsername = await userModel.findOne({ Username });
      if (existingUsername) {
        return res.status(400).json({ message: "username already exists" });
      }

      //hashing password - using promise chain for specific error handling
      bcrypt
        .hash(password, 10)
        .then((hashPassword) => {
          //creating a new user
          const newUser = new userModel({
            Username: Username,
            email,
            password: hashPassword,
          });

          //creating token
          const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });

          //saving user to the database
          newUser
            .save()
            .then((user) => {
              res.status(201).json({
                message: "user created successfully",
                token,
                user: {
                  Username: Username,
                  email: user.email,
                },
              });
            })
            .catch((err) => {
              // This specifically handles database save errors
              res.status(500).json({
                message: "error creating user",
                error: err.message,
              });
            });
        })
        .catch((err) => {
          // This specifically handles bcrypt hashing errors
          res.status(500).json({
            message: "error hashing password",
            error: err.message,
          });
        });
    } catch (error) {
      // This handles database query errors
      console.error("error creating user:", error);
      res.status(500).json({ message: "internal server error" });
    }
  } catch (error) {
    // This handles validation and other outer errors
    console.error("error in signup:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//signin
const signIn = async (req, res) => {
  try {
    //getting data from req body
    const { email, password } = req.body;

    //checking if the user is in the database
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ message: "user not found" });

    //comparing the password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    //creating the token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //return user data on successful signin
    return res.status(200).json({
      message: "login successful",
      token,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error("error signing in:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { signUp, signIn };

// const express = require("express");
// const userModel = require("../models/user");
// const  { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// //signup
// const signUp = async (req,res) => {
// try {
//     //validation checks
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       console.log(error);
//       return res.json({ message: error.array()[0].msg });
//     }

//     //get info from the req body
//  const { Username, email, password } = req.body;
//  try {
//     const user = await userModel.findOne({ email });
//  if (user) {
//       return res.status(400).json({ message: "user already exists" });
//     }

//  //check if the username already exists
//     const existingUsername = await userModel.findOne({ Username });
//     if (existingUsername) {
//       return res.status(400).json({ message: "username  already exists" });
//     }
//  //hashing password
//     bcrypt.hash(password, 10).then((hashPassword) => {
//       //creating a new user
//       const newUser = new userModel({
//         Username: Username,
//         email,
//         password: hashPassword,
//       });
// //creating token
//        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
//         expiresIn: "1d",
//        });
//      //saving user to the database
//       newUser
//         .save()
//         .then((user) => {
//           res
//             .status(201)
//             .json({ message: "user created successfully", token, user });
//         })

//         .catch((err) => {
//           res
//             .status(500)
//             .json({ message: "error creating user", error: err.message });
//         });
//     });
//   } catch (error) {
//     console.error("error creating user:", error);
//     res.status(500).json({ message: "internal server error" });
//   }

// }

// //signin

// const signIn = async (req, res) => {
//   //getting data from req body
//   const { email, password } = req.body;
//   try {
//     //checking if the user is in the database
//     const user = await userModel.findOne({ email });
//     if (!user) return res.json({ message: "user not found" });
//     //comparing the password with hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }
//     //creating the token
//     const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });
//     //return user data on successful signin
//     return res.status(200).json({ message: "login successful", token, user });
//   } catch (error) {
//     console.error("error signing in:", error);
//     res.status(500).json({ message: "internal server error" });
//   }
// };
// module.exports = {signUp,signIn,}
