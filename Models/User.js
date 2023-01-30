var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Thought = require('./Thought');
var seeds = require('../db/seeds')

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
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

//create virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})


//export
const User = mongoose.model('User', userSchema)
module.exports = User