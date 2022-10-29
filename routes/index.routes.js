const router = require("express").Router();
const { restart } = require("nodemon");
const uploadCloud = require("../cloudinary");
const { isAuthenticated } = require("../jwt");

const Cars = require('../models/Cars.model')


router.get("/cars", (req,res) => {
    console.log("Requesting Car List")

    Cars.find()
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
        
        

})


router.post("/cars", uploadCloud.array("image", 10), (req, res, next) => {
    console.log("Posting New Car")
    console.log(req.body, req.files)

    if (!req.files) {
        next(new Error("No file uploaded!"));
        return;
    }

    const {model, make, mileage, engine, price, fuel, color, doors, seats, body, description, bestDeal, transmission, year} = req.body;
     const image = req.files.map( i => i.path)


    Cars.create({model, make, engine, mileage, price, fuel, color, doors, seats, body, description, bestDeal, transmission, image, year})
        .then(response => res.status(200).json({message: "new car"}))
})



// BestDeal 
router.get("/bestDeals", (req, res) => {
    console.log("Requesting Best Deals")

    Cars.find({bestDeals: true})
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
        
})


// Find Specific Car
router.get('/:id', (req, res) => {
    console.log("Getting Chosen Item")

    const {id} = req.params;

    Cars.findById({_id :id})
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))

})

// Edit Specific Car

router.put("/:id", uploadCloud.array("image", 10), async (req, res) => {
    console.log("Modifying Chosen Item")

    const {id} = req.params;
    const {model, make, mileage, engine, price, fuel, color, doors, seats, body, description, bestDeal, transmission, year} = req.body;
    
 
    
    const image = req.files? req.files.map( i => i.path) : null;


    let check ={}; 
    let validModel, validMake, validMileage, validPrice, validColor, validBody, validSeats, validDoors, validEngine, validFuel, validDescription, validBestDeal, validTransmission, validYear;

    await Cars.findById(id)
        .then(response => {check = response
        
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


        })
        .catch(err => console.log(err )) 


    


    Cars.findByIdAndUpdate(id, {model: validModel, make: validMake, mileage: validMileage, engine : validEngine, price : validPrice, fuel : validFuel, color : validColor, doors :validDoors, seats: validSeats, body: validBody, bestDeal: validBestDeal, year: validYear, transmission: validTransmission, description: validDescription})
        .then(response => res.status(200).json("Item Modified"))
        .catch(err => console.log(err))
})


// Delete

router.delete("/:id", (req, res) => {
    console.log("Deleting Chosen Item")

    Cars.deleteOne({_id: id})
        .then(response => res.status(200).json("Item Deleted"))
        .catch(err => console.log(err))
})


// Testimonial Get

router.get("/testimonial", (req, res) => {
    console.log("Requesting All Testimonial")

    Cars.find()
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
        
})


module.exports = router;
