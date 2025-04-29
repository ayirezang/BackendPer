const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Bank", //ref :the model the id is referring to
  },
});
module.exports = mongoose.models("Account", AccountSchema);
