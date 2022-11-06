const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Testimonial = require("../models/testimonial.model");


// Testimonial Get
router.get("/", (req, res) => {
    console.log("Requesting All Testimonial");
  
    Testimonial.find()
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  
  //Testimonial post
  router.post("/", (req, res) => {
    console.log("Creating A Testimonial");
    const { body, author } = req.body;
  
    Testimonial.create({ author, body })
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  
  //Testimonial Edit
  router.put("/:id", async (req, res) => {
    console.log("Editing Testimonial");
  
    const { id } = req.params;
    const { author, body } = req.body;
  
    let validBody, validAuthor;
  
    await Testimonial.findById(id)
      .then((response) => {
        check = response;
  
        validAuthor = author ? author : check.author;
        validBody = body ? body : check.body;
      })
      .catch((err) => console.log(err));
  
    Testimonial.findByIdAndUpdate(id, { author: validAuthor, body: validBody })
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  
  //Delete a Testimonial
  router.delete("/:id", (req, res) => {
    console.log("Deleting Chosen Testimonial");
  
    const { id } = req.params;
  
    Testimonial.deleteOne({ _id: id })
      .then((response) => res.status(200).json("Item Deleted"))
      .catch((err) => console.log(err));
  });



  module.exports = router;
