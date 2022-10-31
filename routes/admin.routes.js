const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isAuthenticated } = require("../jwt");

router.post("/login", (req, res) => {
  console.log("Logging In Admin Mode");

  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide an email and password" });
    return;
  }

  User.findOne({ email })
    .then((loginUser) => {
      if (!loginUser) {
        res.status(400).json({ message: "User not found." });
        return;
      }
      const passedPassword = bcrypt.compareSync(password, loginUser.password);
      if (passedPassword) {
        const { _id, name, email } = loginUser;
        const payload = { _id, name, email };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "2h",
        });
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Cannot authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;
