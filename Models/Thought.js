var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        minLength: 1,
        maxLength: 280,
    }, 
    createdAt: {
        type: Date, 
        default: this.createdAt,
        //(use a getter method to format the timestamp on query)
    }, 
    username: {
        type: String, 
        required: true,
    },
    reactions:  //array of nested documents created with the reactionSchema
    //create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
})var mongoose = require('mongoose');

var reactionSchema = new Schema({
    reactionId: ,//Use Mongoose's ObjectId data type / Default value is set to a new ObjectId
    reactionBody: String, required: true, //280 character maximum
    username: String, required: true,
    createdAt:  Date, //set default value to current timestamp / use a getter method to format the timestamp on query
    //create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
})

//export to user model