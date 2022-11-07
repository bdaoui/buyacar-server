const { Schema, model } = require("mongoose")

const adminSchema  = new Schema({
    identifier: String,
    password: String,
    number: Number,
})

const Admin = model("Admin", adminSchema);
module.exports = Admin;