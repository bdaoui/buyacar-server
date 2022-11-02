const router = require("express").Router();
const { restart } = require("nodemon");
const uploadCloud = require("../cloudinary");
const { isAuthenticated } = require("../jwt");
const Cars = require("../models/Cars.model");
const Admin = require("../models/Admin.model");
const Testimonial = require("../models/Testimonial.model");
const ContactForm = require("../models/ContactForm.model");

router.get("/cars", (req, res) => {
  console.log("Requesting Car List");

  Cars.find()
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

router.post("/cars", uploadCloud.array("image", 10), (req, res, next) => {
  console.log("Posting New Car");

  if (!req.files) {
    next(new Error("No file uploaded!"));
    return;
  }

  const {
    model,
    make,
    mileage,
    engine,
    price,
    fuel,
    color,
    doors,
    seats,
    body,
    description,
    bestDeal,
    transmission,
    year,
  } = req.body;
  const image = req.files.map((i) => i.path);

  Cars.create({
    model,
    make,
    engine,
    mileage,
    price,
    fuel,
    color,
    doors,
    seats,
    body,
    description,
    bestDeal,
    transmission,
    image,
    year,
  }).then((response) => res.status(200).json({ message: "new car" }));
});

// BestDeal
router.get("/bestDeals", (req, res) => {
  console.log("Requesting Best Deals");

  Cars.find({ bestDeals: true })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

// Find Specific Car
router.get("/car/:id", (req, res) => {
  console.log("Getting Chosen Item");

  const { id } = req.params;

  Cars.findById({ _id: id })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

// Edit Specific Car

router.put("/:id", uploadCloud.array("image", 10), async (req, res) => {
  console.log("Modifying Chosen Item");

  const { id } = req.params;
  const {
    model,
    make,
    mileage,
    engine,
    price,
    fuel,
    color,
    doors,
    seats,
    body,
    description,
    bestDeal,
    transmission,
    year,
  } = req.body;
  const image = req.files ? req.files.map((i) => i.path) : null;

  let check = {};
  let validModel,
    validMake,
    validMileage,
    validPrice,
    validColor,
    validBody,
    validSeats,
    validDoors,
    validEngine,
    validFuel,
    validDescription,
    validBestDeal,
    validTransmission,
    validYear;

  await Cars.findById(id)
    .then((response) => {
      check = response;

      validModel = model ? model : check.model;
      validMake = make ? make : check.make;
      validMileage = mileage ? mileage : check.mileage;
      validPrice = price ? price : check.price;
      validColor = color ? color : check.color;
      validBody = body ? body : check.body;
      validSeats = seats ? seats : check.seats;
      validDoors = doors ? doors : check.doors;
      validEngine = engine ? engine : check.engine;
      validFuel = fuel ? fuel : check.fuel;
      validDescription = description ? description : check.description;
      validBestDeal = bestDeal ? bestDeal : check.bestDeal;
      validTransmission = transmission ? transmission : check.transmission;
      validYear = year ? year : check.year;
      image ? image.map(i => check.image.push(i)) : check.image;

    })
    .catch((err) => console.log(err));

  Cars.findByIdAndUpdate(id, {
    model: validModel,
    make: validMake,
    mileage: validMileage,
    engine: validEngine,
    price: validPrice,
    fuel: validFuel,
    color: validColor,
    doors: validDoors,
    seats: validSeats,
    body: validBody,
    bestDeal: validBestDeal,
    year: validYear,
    transmission: validTransmission,
    description: validDescription,
    image: check.image
  })
    .then((response) => res.status(200).json("Item Modified"))
    .catch((err) => console.log(err));
});

// Delete

router.delete("/:id", (req, res) => {
  console.log("Deleting Chosen Car");

  const { id } = req.params;

  Cars.deleteOne({ _id: id })
    .then((response) => res.status(200).json("Item Deleted"))
    .catch((err) => console.log(err));
});

// Delete Image from Car Object

router.put("/:id/image", async (req, res) => {
  console.log("Deleting Chosen Image");

  const { id } = req.params;
  const obj = JSON.parse(JSON.stringify(req.body));
  
  //req.body is a object null prototype.
  //parse n stringify first to convert to string
  //then uses object.keys to extract string value of the key which is image url
  
  let filteredImages = [];

  await Cars.findById(id)
    .then((response) => {
      filteredImages = response.image.filter(
        (item) => item != Object.keys(obj)
      );
    })
    .catch((err) => console.log(err));

  Cars.updateOne({ _id: id }, { image: filteredImages })
    .then((response) => res.status(200).json("Image Deleted"))
    .catch((err) => console.log(err));
});

//Delete All Image from Car
router.put("/:id/all", (req, res) => {
  console.log("Deleting All Images");
  const { id } = req.params;
  emptyArray = []

  Cars.updateOne({ _id: id }, { image: emptyArray })
    .then((response) => res.status(200).json("Images Deleted"))
    .catch((err) => console.log(err));
});

// Testimonial Get
router.get("/testimonial", (req, res) => {
  console.log("Requesting All Testimonial");

  Testimonial.find()
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

//Testimonial post
router.post("/testimonial",  (req, res) => {
  console.log("Creating A Testimonial");
  const {body, author} = req.body

  Testimonial.create({author, body})
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

//Testiomonial Edit
router.put("/testimonial/:id", async (req, res) => {
  console.log("Editing Testimonial");

  const {id} = req.params
  const {author, body} = req.body
  
  let validBody, validAuthor;

  await Testimonial.findById(id)
    .then((response) => {
      check = response;

      validAuthor = author ? author : check.author;
      validBody = body ? body : check.body;
    })
    .catch(err => console.log(err))

  Testimonial.findByIdAndUpdate( id, {author : validAuthor, body : validBody})
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
});

//Delete a Testimonial
router.delete("/testimonial/:id",  (req, res) => {
  console.log("Deleting Chosen Testimonial");

  const { id } = req.params;

  Testimonial.deleteOne({ _id: id })
    .then((response) => res.status(200).json("Item Deleted"))
    .catch((err) => console.log(err));
});

//Post Contact Form
router.post("/contact", (req, res) =>{
  console.log("Sending a Message")

  const { contactName,
      contactLastName,
      contactEmail,
      contactPhone,
      contactSubject,
      contactMessage} = req.body;

  ContactForm.create(     
      {
          name: contactName,
          lastName: contactLastName,
          email: contactEmail,
          phone: contactPhone,
          subject: contactSubject,
          message: contactMessage
      }
  )
  .then(response => res.status(200).json("Message Sent!"))
  .catch(err => console.log(err))
})

module.exports = router;
