const { Schema, model } = require("mongoose")


const carsSchema  = new Schema({
    make: String,
    model: String,
    image: [String], 
    gearbox: {type: Boolean, default: true},
    mileage: Number,
    price: Number,
    description: String,
    bestDeal: {type: Boolean, default: false}
})


const Cars = model("Cars", carsSchema);
module.exports = Cars;