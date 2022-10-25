const { Schema, model } = require("mongoose")


const adminSchema  = new Schema({
    identifier: String,
    password: String,
})


const Admin = model("Admin", adminSchema);
module.exports = Admin;