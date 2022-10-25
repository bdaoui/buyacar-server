const { Schema, model } = require("mongoose")


const carsSchema  = new Schema({
    name: String,
    model: String,
    make: String,
    image: String, 
    gearbox: String,
    mileage: Number,
    price: Number,
    description: String,
    bestDeal: {Boolean, default: false}
})


const Cars = model("Cars", carsSchema);
module.exports = Cars;