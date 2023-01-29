var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        trim: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: [ isEmail, 'invalid email']
    },
    thoughts: 
        //reference thought model array of id values
    ,
    friends: //reference array of id values from this model
    //create virtual called friendCount that retrieves the length of the user's friends array field on query
})


//export
const User = mongoose.model('User', userSchema)
module.exports = User