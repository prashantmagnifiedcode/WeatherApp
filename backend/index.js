const express = require("express");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
const Weather  = require("./Router/Weather")
const cors = require("cors");
app.use(express.json({limit: '50mb'}));
app.use(cors({})) 
app.use("/api", Weather);
app.listen(process.env.PORT||5000, _=> console.log("backend server is running on port: "+ process.env.PORT))


