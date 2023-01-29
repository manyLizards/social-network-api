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
    reactions: [reactionSchema],
    //create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
})

var reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxLength: 280,
    },
    username: {
        type: String, 
        required: true,
    },
    createdAt:  {
        type: Date, 
        default: this.createdAt,
        //use a getter method to format the timestamp on query
    }
    //create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
})

//export to user model