var express = require('express');
const { userInfo } = require('os');

const app = express();

//Get all users
app.get('/users');

//Get a single user by its _id and populated thought and friend data
User.findById(id, function (err, user) {
    if (err) return handleError(err);

})

//POST a new User
User.post()

//Example data {"username": "lernantino", "email": "lernantino@gmail.com"}
//PUT to update a user by its _id
//DELETE to remove user by its _id
//Remove a user's associated thoughts when deleted
//:userId/friends/:friendId -> POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
