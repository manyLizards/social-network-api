const bodyParser = require('body-parser');
const { Thought, User } = require('../models');
const thought404Message = (id) => `Thought with ID: ${id} not found.`
const thought200Message = (id) => `Thought with ID: ${id} has been deleted.`
const reaction200Message = (id) => `Reaction with ID: ${id} has been deleted.`

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-_v' })
        .select('-_v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err))
    },

    //get one thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
        .populate({ path: 'reactions', select: '-_v' })
        .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id)}))
        .catch(err => res.status(404).json(err))
    },

    //add a thought
    createThought({ body }, res) {
        Thought.create({ thoughtText: body.ThoughtText, username: body.username })
        .then(({_id}) => User.findOneAndUpdate({_id: body.userId}, { $push: {thoughts: _id } }, { new: true }))
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err))
    },
    
    //update thought info
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true })
        .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(400).json(err))
    },

    //delete thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => dbThoughtData ? res.json(thought200Message(dbThoughtData._id)) : res.status(404).json({ message: thought404Message(params.id) }))
        .catch(err => res.status(404).json(err))
    },

    //add a reaction to thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {__id: params.thoughtId},
            { $push: {reactions: {reactionBody: body.reactionBody, username: body.username}}},
            {new: true, runValidators: true })
            .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
            .catch(err => res.status(400).json(err))
    },

    //remove a reaction from thought
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate (
            { _id: params.thoughtId },
            { $push: { reactions: { reactionBody: body.reactionBody, username: body.username} } },
            { new: true, runValidators: true })
            .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: thought404Message(params.id) }))
            .catch(err => res.status(404).json(err))
    }
}

module.exports = thoughtController