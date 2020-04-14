const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  console.log("admin");
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      res.status(401).json({ msg: "Sorry User Error" });
    }

    if (!user.admin) {
      res.status(401).json({ msg: "Sorry User Error" });
    }

    req.token = token;
    req.user = { id: user.id, name: user.name, email: user.email, admin: true };

    next();

    //end
  } catch (e) {
    res.status(401).json({ msg: "Please authenticate" });
  }
};

module.exports = [isAdmin];
