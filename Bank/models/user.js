const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
