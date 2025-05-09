const AccountModel = require("../models/Account");
const BankModel = require("../models/Bank");

//create account
const createAccountController = async (req, res) => {
  try {
    const { name, number, accountType, bankId } = req.body;
    const account = new AccountModel({ name, number, accountType, bankId });
    const savedAccount = await account.save();
    res.json({ message: "account created", data: savedAccount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save" });
  }
};
//fetch account
const listAccountController = async () => {
  try {
    const bank = await BankModel.find().populate("accountId");
    res.json({ message: "account fetched", data: bank });
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
};
module.exports = { createAccountController, listAccountController };
