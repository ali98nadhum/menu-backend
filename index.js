const express = require("express");
const connectToDB = require("./config/connentToDb");
require("dotenv").config();
const cors = require('cors');


// Connect to DB 
connectToDB();


const app = express();


// Middlewarss
app.use(express.json());
app.use(cors({
    origin: '*',
  }));

  // Routes
  app.use("/api/v1/category" , require("./routes/categoryRoute"));
  app.use("/api/v1/subcategory" , require("./routes/productRoute"));


  // Run Server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is run on port ${port}`))