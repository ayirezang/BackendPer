let BankModel = require("./BankModel");

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

const createBankController = (req, res) => {
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
      return res.json({ message: "bank deleted", data: deletedBank });
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
  updateBankController,
  listBankController,
  deleteBankController,
};
