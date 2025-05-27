const express = require("express");
const { signUp, signIn } = require("../controllers/user");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/api/signup",
  [
    body("Username")
      .notEmpty()

      .trim()
      .withMessage("username required")
      .isLength({ min: 5, max: 10 })
      .withMessage("username should at least  5 words"), //password,
    body("password")
      .notEmpty()
      .trim()
      .withMessage("password required")
      .isLength({ min: 6, max: 12 }), //email
    body("email").notEmpty().trim().withMessage("email required"),
  ],
  signUp
);
router.post("/api/signin", signIn);

module.exports = router;
