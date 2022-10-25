const router = require("express").Router();
const uploadCloud = require("../cloudinary");
const { isAuthenticated } = require("../jwt.middleware");

const Cars = require('../models/Cars.model')


router.get("/cars", (req,res) => {
    console.log("Requesting Car List")

    Cars.find()
        .then(response => res.status(200).json(response)
        .catch(err => console.log(err))
        
        )

})


router.post("/cars", isAuthenticated, uploadCloud.single("image"), (req, res) => {
    console.log("Posting New Car")

    const {name, model, make, mileage, price, description, bestDeal} = req.body;
    const image = req.file.path;

    if (!req.file) {
        next(new Error("No file uploaded!"));
        return;
    }


    Cars.create({name, model, make, mileage, price, description, bestDeal, image})
        .then(response => res.status(200).json({message: "new car"}))
})



// BestDeal 

router.get("/bestDeals", (req, res) => {
    console.log("Requesting Best Deals")

    Cars.find({bestDeals: true})
        .then(response => res.status(200).json(response)
        .catch(err => console.log(err))
        )
})
