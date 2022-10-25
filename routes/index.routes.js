const router = require("express").Router();
const { restart } = require("nodemon");
const uploadCloud = require("../cloudinary");
const { isAuthenticated } = require("../jwt.middleware");

const Cars = require('../models/Cars.model')


router.get("/cars", (req,res) => {
    console.log("Requesting Car List")

    Cars.find()
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))
        
        

})


router.post("/cars", isAuthenticated, uploadCloud.single("image"), (req, res) => {
    console.log("Posting New Car")

    const {name, model, make, mileage, price, description, bestDeal, gearbox} = req.body;
    const image = req.file.path;

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }


    Cars.create({name, model, make, mileage, price, description, bestDeal, gearbox, image})
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

    Cars.findById(id)
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))

})

// Edit Specific Car

router.put("/:id", (req, res) => {
    console.log("Modifying Chosen Item")

    const {id} = req.params;
    const {name, model, make, mileage, price, description, bestDeal, gearbox} = req.body;
    let check ={}; 

    Cars.findById(id)
        .then(response => check = response)
        .catch(err => console.log(err )) 


    name ? name : check.name;
    model ? model : check.model;
    make ? make : check.make;
    mileage ? mileage : check.mileage;
    price ? price : check.price;
    description ? description : check.description;
    bestDeal ? bestDeal : check.bestDeal;
    gearbox ? gearbox : check.gearbox;


    Cars.findByIdAndUpdate(id, {name: setName, model, make, mileage, price, description, bestDeal, gearbox})
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