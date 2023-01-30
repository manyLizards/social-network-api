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
        get: (date) => timeSince(date),
    }, 
    username: {
        type: String, 
        required: true,
    },
});

var reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxLength: 280,
    },
    username: {
        type: String, 
        required: true,
        maxLength: 280
    },
    createdAt:  {
        type: Date, 
        default: Date.now,
        get: (time) => timeSince(time),
    }
})

//create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//export
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought
