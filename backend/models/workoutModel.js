const mongoose = require('mongoose')

const Schema = mongoose.Schema

const setSchema = new Schema({
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, { _id: false })

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: [setSchema],
        required: true
    }
}, { _id: false })

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    duration: {
        type: Number,
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

module.exports = mongoose.model('Workout', workoutSchema)
