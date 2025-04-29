const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
});

const BankModel = mongoose.model("Bank", BankSchema);
module.exports = BankModel;

// //model
// class BankModel {
//   constructor({ name, location, branch, phone, address, accountNumber }) {
//     this.name = name;
//     this.location = location;
//     this.branch = branch;
//     this.phone = phone;
//     this.address = address;
//     this.accountNumber = accountNumber;
//   }
//   save() {
//     bankDB.push(this);
//     return this;
//   }
//   static all() {
//     return bankDB;
//   }
//   // method for updating banks in the database
//   //implement the update func in the bank model
//   //contains an obj that cons info to be used to update  the bank
//   static update(updateInfo = {}) {
//     //find the bank and update
//     bankDB = bankDB.map((bank) => {
//       if (bank.name === updateInfo.name) {
//         return { ...bank, ...updateInfo };
//       }
//       return bank;
//     });
//   }
//   //method for deleting
//   static delete({ name }) {
//     let deletedBank = null;
//     bankDB = bankDB.filter((bank) => {
//       if (bank.name !== name) {
//         return true;
//       }
//       deletedBank = bank;
//       return false;
//     });
//     return deletedBank;
//   }
// }
// module.exports = BankModel;
