const router = require("express").Router();
const uploadCloud = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Cars = require("../models/Cars.model");



// Get All Cars 

router.get("/", (req, res) => {
    console.log("Requesting Car List");
  
    Cars.find()
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  
  router.post("/", uploadCloud.array("image", 10), (req, res, next) => {
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
    }).then((response) => res.status(200).json("Voiture Créer"));
  });
  
  // Get All BestDeal
  router.get("/bestdeals", (req, res) => {
    console.log("Requesting Best Deals");
  
    Cars.find({ bestDeal: "yes" })
      .then((response) => res.status(200).json(response))
      .catch((err) => console.log(err));
  });
  


  // Find Specific Car
  router.get("/:id", (req, res) => {
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
        validDescription = description ? description : check.description;
        validBestDeal = bestDeal ? bestDeal : check.bestDeal;
        validYear = year ? year : check.year;
        
        validFuel = fuel ? fuel : check.fuel;
        validTransmission = transmission ? transmission : check.transmission;
       
        
        image ? image.map((i) => check.image.push(i)) : check.image;
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
      image: check.image,
    })
      .then((response) => res.status(200).json("Voiture modifiée"))
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
    emptyArray = [];
  
    Cars.updateOne({ _id: id }, { image: emptyArray })
      .then((response) => res.status(200).json("All Images Deleted"))
      .catch((err) => console.log(err));
  });


module.exports = router;
