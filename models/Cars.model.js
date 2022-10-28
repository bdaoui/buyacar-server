const { Schema, model } = require("mongoose")


const carsSchema  = new Schema({
    make: String,
    model: String,
    price: Number,
    image: [String], 
    mileage: Number,
    color: String,
    fuel: String,
    seats: Number,
    doors: Number,
    body: String,
    engine: String,
    transmission: String,
    bestDeal: String,
    description: String
})


const Cars = model("Cars", carsSchema);
module.exports = Cars;