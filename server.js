//establish connection
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const Thought = require ('./models/Thought');
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.set('debug', true)

//setting up express
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Separate Routes for each Resource
const usersRoute = require("./routes/users.js"); 
const thoughtRoute = require("./routes/thought.js");
app.use(usersRoute);
app.use(thoughtRoute);

//control the rate at which user requests are processed by the server
const limiter = rateLimit({
    windowsMs: 1 * 60 * 1000, //1 minute
    max: 30 //30 requests
});

app.use(limiter);

app.get("/", (req, res) => {
    res.json({
        user: ""
    })
})

//Server Listen
app.listen(PORT, () => {
    console.log((`Connected on localhost:${PORT}`))
})