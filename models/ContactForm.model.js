const {Schema, model} = require("mongoose")

const contactFormSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    phone: String,
    subject: {
        type : String,
        maxLength : 250
    },
    message: String,
    status: {
        type: Boolean,
        required: true,
        default: false
    }
})

const ContactForm = model("ContactForm", contactFormSchema)
module.exports = ContactForm;