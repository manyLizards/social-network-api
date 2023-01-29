const mongoose = require('mongoose');
const Thought = require('../Models/Thought')
const User = require('../Models/User')

mongoose
    .connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch((err) => {
        console.log(err);
    });

//seed thoughts
const seedThoughts = [
    {
        thoughtText: "Cool!"
        userName: "coolguy1",
        reactions: //finish once you have reaction schema
    },
    {
        thoughtText: "Wow!",
        userName: "WeThePeople",
        reactions: //finish once you have reaction schema
    },
    {
        thoughtText: "Interesting...",
        userName: "professorSmartyPants",
        reactions: //finish once you have reaction schema
    }
];

//seed users
const seedUsers = [
    {
        userName: "coolguy1",
        email: "coolguy1@aol.com"
        thoughts: ,//complete once model is finished
        friends: //complete once model is finished
    },
    {
        userName: "WeThePeople",
        email: "patriot@yahoo.com"
        thoughts: ,//complete once model is finished
        friends: //complete once model is finished
    },
    {
        userName: "professorSmartyPants",
        email: "dr.octogonapus@gmail.com"
        thoughts: ,//complete once model is finished
        friends: //complete once model is finished
    }
];

const seedDB = async () => {
    await Thought.insertMany(seedThoughts);
    await User.insertMany(seedUsers);
};

seedDB().then(() => {
    mongoose.connection.close();
})