const express = require("express");
const router = express.Router("router");
const BankModel = require("../models/Bank");
const { body } = require("express-validator");
const {
  createBankController,
  listBankController,
  updateBankController,
  deleteBankController,
} = require("../controllers/bank");
const Authorization = require("../controllers/Auth");

router.get("/bank", Authorization, listBankController);
router.get("/bank/:id", listBankController); //express validator week 8

//create
router.post(
  "/bank",

  [
    //name

    body("name")
      .notEmpty()

      .withMessage("Name field required")
      .trim()
      .isLength({ min: 5, max: 40 }),
    //location
    body("location")
      .notEmpty()
      .withMessage("Location field is required")
      .trim(),
    //branch
    body("branch")
      .notEmpty()
      .trim()
      .withMessage("branch field required")
      .isLength({ min: 5, max: 40 })
      .withMessage("branch should be between 5 and 40 characters"),
    //address
    body("address")
      .notEmpty()
      .withMessage("address field required")
      .trim()

      .isLength({ min: 5, max: 50 })
      .withMessage("address should be between  5 to 50 words  "),
    //account number
    body("accountNumber")
      .notEmpty()

      .withMessage("accountNumber required")
      .trim()
      .isLength({ min: 10, max: 15 })
      .withMessage("account Number should be between 10 to 15 digits")
      .isNumeric()
      .withMessage("Account number should contain only digits")
      .custom((value, { req }) => {
        return BankModel.findOne({ accountNumber: value }).then(
          (oneaccountNumber) => {
            if (oneaccountNumber) {
              return Promise.reject("account number is already taken");
            }
          }
        );
      }),
    body("phone")
      .notEmpty()
      .withMessage("  valid Phone number of Ghana or Nigeria  required")
      .isMobilePhone(["en-GH", "en-NG"])

      .custom((value, { req }) => {
        return BankModel.findOne({ phone: value }).then((oneNumber) => {
          if (oneNumber) {
            return Promise.reject("Number is already taken");
          }
        });
      }),
  ],
  createBankController
);

//update
router.put("/bank", updateBankController);
//delete
router.delete("/bank", deleteBankController);

module.exports = router;
