const BankModel = require("../models/Bank");
const AccountModel = require("../models/Account");
const { validationResult } = require("express-validator");

//import the validator

// controllers
function listBankController(req, res) {
  //view bank
  const { id } = req.params; //req.params gives you access to dynamic parts
  //  of the URLan object that contains parameters from the URL in Express.js routes
  if (id) {
    // const bank = BankModel.all();
    BankModel.find({ _id: id })
      .then((bank) => {
        res.json({ data: bank });
      })
      .catch((err) => console.log(err));
  } else {
    BankModel.find()
      .then((bank) => {
        res.json({ data: bank });
      })
      .catch((err) => console.log(err));
  }
}
//create

const createBankController = (req, res) => {
  //validation checks
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return res.json({ message: error.array()[0].msg });
  }

  //create bank
  const { name, location, branch, phone, address, accountNumber } = req.body;
  const bank = new BankModel({
    name,
    location,
    branch,
    phone,
    address,
    accountNumber,
  });
  //execute a query on the bank's model save ()internal method defined by mongoose it returns a promise
  bank
    .save() // Creates a new document in the banks collection
    .then((result) => {
      res.json({ message: "created successful", data: bank });
    })
    .catch((error) => console.log(error));
};
//update
const updateBankController = (req, res) => {
  const { id, name, location, branch, phone, address, accountNumber } =
    req.body;

  BankModel.findById(id)
    .then((bank) => {
      if (bank) {
        bank.name = name;
        bank.location = location;
        bank.branch = branch;
        bank.phone = phone;
        bank.address = address;
        bank.accountNumber = accountNumber;

        bank
          .save()
          .then((updatedBank) => {
            res
              .status(200)
              .json({ message: "updated successful", data: updatedBank });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error saving updated bank" });
          });
      } else {
        res.status(404).json({ error: "Bank not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error finding bank" });
    });
};
//delete

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

module.exports = {
  createBankController,
  listBankController,
  updateBankController,
  deleteBankController,
};
