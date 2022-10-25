const router = require("express").Router();
const uploadCloud = require("../cloudinary");
const Cars = require('../models/Cars.model')


router.get("/cars", (req,res) => {
    console.log("Requesting Car List")

    Cars.find()
        .then(response => res.status(200).data(response)
        .catch(err => console.log(err))
        
        )

})



router.get("/bestDeals", (req, res) => {
    console.log("Requesting Best Deals")

    Cars.find({bestDeals: true})
        .then(response => res.status(200).data(response)
        .catch(err => console.log(err))
        )
})

