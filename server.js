const express = require("express");
const connectDB = require("./config/database");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const app = express();

//Database Connection
connectDB();

//MiddleWare
app.use(express.json({ extended: false }));
app.use(fileUpload());
app.use(cors());

//Defined Routes
app.use("/api/admin", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/paper", require("./routes/paper"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Started on 5000"));
