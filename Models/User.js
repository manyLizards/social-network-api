var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String, required: true, //trim it
    email: String, required: true, //make it unique AND match 
    thoughts: //reference thought model array of id values
    ,
    friends: //reference array of id values from this model
    //create virtual called friendCount that retrieves the length of the user's friends array field on query
})
