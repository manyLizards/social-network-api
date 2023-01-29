//use dotenv for development
require ("dotenv").config

//establish connection
const PORT = process.env.PORT || 8082;
const ENV = process.env.NODE_ENV || "development";
const express = require("express");
const app = express();
const Thought = require ('./models/Thought');

mongoose
    .connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.log(err);
    });

//setting up express
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

//Separate Routes for each Resource
const usersRoute = require("./routes/users.js"); 
const thoughtRoute = require("./routes/thought.js");

//control the rate at which user requests are processed by the server
const limiter = rateLimit({
    windowsMs: 1 * 60 * 1000, //1 minute
    max: 30 //30 requests
});

app.use(limiter);

//mount resource routes
app.use("./routes/users.js", usersRoute);
app.use("./routes/thought.js", thoughtRoute);

app.get("/", (req, res) => {
    res.json({
        user: ""
    })
})