const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./route/route");

app.use(express.json());
app.use("/", route);

try {
    mongoose.connect("mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/Tokeshwar", {
        useNewUrlParser: true,
    });
    console.log(`MongoDB connection successful`);
} catch (error) {
    console.log(error);
}

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Express App running on port ${port} `));