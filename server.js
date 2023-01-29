//use dotenv for development
require ("dotenv").config


const PORT = process.env.PORT || 8082;
const ENV = process.env.NODE_ENV || "development";
const express = require("express");
const app = express();

//setting up express
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

//Separate Routes for each Resource
const usersRoute = require("./routes/users");
const thoughtRoute = require("./routes/thought");