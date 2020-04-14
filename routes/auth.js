const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/isAuth");

//Get logged in user
router.get("/", [isAuthenticated], (req, res) => {
  res.json({ user: req.user });
});

//Login
router.post("/", async (req, res) => {
  //start

  const { rollNo, password } = req.body;

  try {
    let user = await User.findOne({ rollNo });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    const payload = {
      user: {
        id: user.id,
        admin: user.admin,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }

  //end
});

module.exports = router;
