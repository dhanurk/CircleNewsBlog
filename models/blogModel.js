const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  blogContent: {
    type: String
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Blog = mongoose.model("blogs", blogSchema);
