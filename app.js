// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// ℹ️ Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
const cors = require("cors");

// Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
// Services like heroku use something called a proxy and you need to add this to your server
app.set("trust proxy", 1);

// controls a very specific header to pass headers from the frontend
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:3000",
  })
);

// To have access to `body` property in the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const carRoutes = require("./routes/car.routes");
app.use("/car", carRoutes);

const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

const testimonialRoutes = require("./routes/testimonial.routes");
app.use("/testimonial", testimonialRoutes);

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
