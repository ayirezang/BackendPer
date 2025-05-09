const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  //field to hold the banks id
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Bank", //ref :the model the id is referring to O(bank)
    required: true,
  },
});
module.exports = mongoose.model("Account", AccountSchema);
