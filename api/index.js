const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const cors = require('cors');
const mongoose = require('mongoose');



const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.get('/', (req, res) => {
    res.send('app is running...');
});
app.use("/api", require("./routes/index"));

app.listen(5000, () => {
    mongoose.connect("mongodb+srv://mdhgtushar:DTtZgDAU3i5Ujg6b@cluster0.0ba1y.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to MongoDB');
    })

    console.log('Server is running on port 5000');
});