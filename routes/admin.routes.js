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


// Display and Change the Number in Footer


router.get("/number", (req, res) => {
  console.log('Getting Number for Admin')
  const id = "63624e2493a42858e2f4a935"


  Admin.findById(id)
    .then(response => res.status(200).json(response.number) )
    .catch(err => console.log(err))

})

router.put("/number", (req, res) => {
  console.log("Editing Number for Admin")
  console.log(req.body)

  const obj = JSON.parse(JSON.stringify(req.body));
  const phone = Object.keys(obj)


  Admin.findByIdAndUpdate({_id: "63624e2493a42858e2f4a935"},
    {number: phone[0]}
    )
  .then(response  => {
    console.log(response)
    res.status(200).json("Numero Modifiée")})
  .catch(err => console.log(err))

})



module.exports = router;
