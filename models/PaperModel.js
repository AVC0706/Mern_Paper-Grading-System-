const mongoose = require("mongoose");

const PaperModelSchema = mongoose.Schema({
  filename: {
    type: String,
  },
  downloadUrl: {
    type: String,
  },
  subject: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("modelPapers", PaperModelSchema);
