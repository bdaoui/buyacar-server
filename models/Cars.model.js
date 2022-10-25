const { Schema, model } = require("mongoose")


const carsSchema  = new Schema({
    make: String,
    model: String,
    image: [String], 
    transmission: String,
    mileage: Number,
    price: Number,
    description: String,
    bestDeal: {Boolean, default: false}
})


const Cars = model("Cars", carsSchema);
module.exports = Cars;