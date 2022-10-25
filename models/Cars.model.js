const { Schema, model } = require("mongoose")


const carsSchema  = new Schema({
    name: String,
    model: String,
    Make: String,
    image: String,
    mileage: Number,
    price: Number,
    description: String,
    bestDeal: {Boolean, default:"false"}

})


const Cars = model("Cars", carsSchema);
module.exports = Cars;