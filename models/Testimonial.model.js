const { Schema, model } = require("mongoose")

const testimonialSchema  = new Schema({
    body: String,
    author: String,
    image: String
})

const Testimonial = model("Testimonial", testimonialSchema);
module.exports = Testimonial;