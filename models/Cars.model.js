const { Schema, model } = require("mongoose")


const carsSchema  = new Schema({
    make: String,
    model: String,
    image: [String], 
    color: String,
    fuel: String,
    seats: Number,
    doors: Number,
    bodyType: String,
    transmission: {type: Boolean, default: true},
    mileage: Number,
    price: Number,
    description: String,
    bestDeal: {type: Boolean, default: false}
})


const Cars = model("Cars", carsSchema);
module.exports = Cars;