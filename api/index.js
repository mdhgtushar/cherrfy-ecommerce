const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();





app.use("/api", require("./routes.js"));


app.listen(8080, () => {
    mongoose.connect("mongodb+srv://mdhgtushar:DTtZgDAU3i5Ujg6b@cluster0.0ba1y.mongodb.net/")
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB error:", err));

    console.log("Server running on port 8080")
});
 