const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.model");

router.post("/login", (req, res) => {
  console.log("Logging In Admin Mode");

  const { identifier, password } = req.body;
  console.log(req.body)

  if (identifier === "" || password === "") {
    res.status(400).json("Données incorrectes");
    return;
  }

  Admin.findOne({ identifier })
    .then((loginUser) => {
      console.log(loginUser)
      if (!loginUser) {
        res.status(400).json("Données incorrectes");
        return;
      }
      const passedPassword = bcrypt.compareSync(password, loginUser.password);
      console.log(passedPassword)
      if (passedPassword) {
        const { _id, identifier } = loginUser;
        const payload = { _id, identifier };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "2h",
        });
        res.status(200).json("Se connecter...");
      } else {
        res.status(400).json("Données incorrectes");
      }
    })
    .catch((err) => res.status(500).json("Server Error"));
});

router.get("/verify", (req, res) => {
  res.status(200).json(req.payload);
});


router.get("/number", (req, res) => {
  'Getting Number for Admin'
  
  Admin.find()
    .then(response => response.number)
    .catch(err => console.log(err))

})

module.exports = router;
