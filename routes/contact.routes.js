const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const ContactForm = require("../models/ContactForm.model");


// Contact Get
router.get("/", (req, res) => {
    console.log("Requesting All Messages");
  
    ContactForm.find()
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  
  //Post Contact Form
  router.post("/", (req, res) => {
    console.log("Sending Message");
  
    const {
      contactName,
      contactLastName,
      contactEmail,
      contactPhone,
      contactSubject,
      contactMessage,
    } = req.body;
  
    ContactForm.create({
      name: contactName,
      lastName: contactLastName,
      email: contactEmail,
      phone: contactPhone,
      subject: contactSubject,
      message: contactMessage,
    })
      .then((response) => res.status(200).json("Envoi Du Message!"))
      .catch((err) => console.log(err));
  });

   //Post Contact Form For Single Car
   router.post("/car", (req, res) => {
    console.log("Sending Message");
    console.log(req.body.contactSubject)

    const {
      contactName,
      contactLastName,
      contactEmail,
      contactPhone,
      messageCar,
      contactMessage,
    } = req.body;
  
    ContactForm.create({
      name: contactName,
      lastName: contactLastName,
      email: contactEmail,
      phone: contactPhone,
      subject: messageCar,
      message: contactMessage,
      direct: true
    })
      .then((response) => res.status(200).json("Envoi Du Message!"))
      .catch((err) => console.log(err));
  });
  
  //Set Contact Status
  router.put("/:id", async (req, res) => {
    console.log("Editing Message Status");
    
    const { id } = req.params;
    const obj = JSON.parse(JSON.stringify(req.body));
    let stringStatus = Object.keys(obj)
    let booleanStatus = await stringStatus == 'read' ? true : false
  
    ContactForm.findByIdAndUpdate(id, { status: booleanStatus })
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  
  //Delete Contact
  router.delete("/:id", (req, res) => {
    console.log("Deleting Chosen Contact");
  
    const { id } = req.params;
  
    ContactForm.deleteOne({ _id: id })
      .then((response) => res.status(200).json("Item Deleted"))
      .catch((err) => console.log(err));
  });


  module.exports = router;
