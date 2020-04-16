const mongoose = require("mongoose");

const PaperSchema = mongoose.Schema({
  filename: {
    type: String,
  },
  downloadUrl: {
    type: String,
    unique: true,
  },
  rollNo: {
    type: String,
  },
  subject: {
    type: String,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  modelAnswer: {
    type: String,
  },
});

module.exports = mongoose.model("pdfPaper", PaperSchema);
