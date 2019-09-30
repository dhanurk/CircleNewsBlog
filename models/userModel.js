const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  GoogleId: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
