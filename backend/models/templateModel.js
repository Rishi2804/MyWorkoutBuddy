const mongoose = require('mongoose')

const Schema = mongoose.Schema

const setSchema = new Schema({
    reps: {
        type: Number,
        required: false,
        default: null
    },
    weight: {
        type: Number,
        required: false,
        default: null
    }
}, { _id: false })

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: [setSchema],
        required: true,
        default: [{reps: null, weight: null}]
    }
}, { _id: false })

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    exercises: {
        type: [exerciseSchema],
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Template', workoutSchema)
