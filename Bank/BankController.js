let BankModel = require("./models/Bank");
const { validationResult } = require("express-validator");

//
// const deleteBankController = (req, res) => {
//   //delete bank

//   const { id } = req.body; // request body sent to the delete bankcontroller
//   //call the static method on the bankmod
//   BankModel.findByIdAndDelete(id).then((deletedBank) => {
//     if (deletedBank) {
//       res.json({ message: "bank deleted", data: deletedBank });
//     }
//   });
// };

const deleteBankController = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedBank = await BankModel.findByIdAndDelete(id);

    if (deletedBank) {
      try {
        //find every account asscioted and delete it method deletemany
        const deletedResult = awaitAccountModel.deleteMany({
          bankId: deletedBank._id,
        });
        console.log(" account deletedResult:", deletedResult);
        return res.json({ message: "bank deleted", data: deletedBank });
      } catch (error) {
        console.error("Error deleting accounts:", deleteError);
        return res.json({
          message: "bank deleted but failed to delete some associated accounts",
          data: deletedBank,
          accountDeletionError: deleteError.message,
        });
      }
    } else {
      return res.status(404).json({ message: "Bank not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting bank", error: error.message });
  }
};

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

module.exports = {
  createBankController,
  updateBankController,
  listBankController,
  deleteBankController,
  createAccountController,
  listAccountController,
};
