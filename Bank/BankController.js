let BankModel = require("./models/Bank");
const { validationResult } = require("express-validator");

module.exports = {
  createBankController,
  updateBankController,
  listBankController,
  deleteBankController,
  createAccountController,
  listAccountController,
};
