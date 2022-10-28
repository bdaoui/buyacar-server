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

    const {model, make, mileage, engine, price, fuel, color, doors, seats, body, description, bestDeal, transmission} = req.body;
     const image = req.files.map( i => i.path)


    Cars.create({model, make, engine, mileage, price, fuel, color, doors, seats, body, description, bestDeal, transmission, image})
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

router.put("/:id", uploadCloud.array("image", 10), (req, res) => {
    console.log("Modifying Chosen Item")

    const {id} = req.params;
    const {model, make, mileage, engine, price, fuel, color, doors, seats, body, description, bestDeal, transmission} = req.body;
    
    
    const image = req.files? req.files.map( i => i.path) : null;

    console.log("this is the id ", id)

    let check ={}; 

    Cars.findById(id)
        .then(response => check = response)
        .catch(err => console.log(err )) 


    model ? model : check.model;
    make ? make : check.make;
    mileage ? mileage : check.mileage;
    price ? price : check.price;
    color ? color : check.color;
    body ? body : check.body;
    seats ? seats : check.seats;
    doors ? doors : check.doors;
    engine ? engine : check.engine;
    fuel ? fuel : check.fuel;
    description ? description : check.description;
    bestDeal ? bestDeal : check.bestDeal;
    transmission ? transmission : check.transmission;


    Cars.findByIdAndUpdate(id, { model, make, mileage, engine, price, fuel, color, doors, seats, body, description, bestDeal, transmission})
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


module.exports = router;
