const express = require("express");
const cors = require("cors");
const app = express();


require("dotenv").config();

require("./db");


// controls a very specific header to pass headers from the frontend
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:3000",
  })
);

// To have access to `body` property in the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const carRoutes = require("./routes/car.routes");
app.use("/car", carRoutes);

const contactRoutes = require("./routes/contact.routes");
app.use("/contact", contactRoutes);

const testimonialRoutes = require("./routes/testimonial.routes");
app.use("/testimonial", testimonialRoutes);

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
