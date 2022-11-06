// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
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

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
