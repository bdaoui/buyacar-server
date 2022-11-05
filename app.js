
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");


const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//Routes
const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const carRoutes = require("./routes/car.routes");
app.use("/car", carRoutes);

const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

const testimonialRoutes = require("./routes/testimonial.routes");
app.use("/testimonial", testimonialRoutes);

module.exports = app;
