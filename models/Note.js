const mongoose = require("mongoose");
mongoose.promise = global.Promise;
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  // 0 is text, 1 is link
  noteType: {
    type: Number,
    required: "Note type is required"
  },
  text: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: "User Id is required"
  }
});

module.exports = mongoose.model("Note", noteSchema);
