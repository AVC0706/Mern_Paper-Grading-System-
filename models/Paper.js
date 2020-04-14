const mongoose = require("mongoose");

const PaperSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  filename: {
    type: String,
  },
  downloadUrl: {
    type: String,
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
