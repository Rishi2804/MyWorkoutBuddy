const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    force: {
        type: String,
        enum: ["static", "pull", "push" ],
        required: false
    },
    level: {
        type: String,
        enum: [ "beginner", "intermediate", "expert" ],
        required: true
    },
    mechanic: {
        type: String,
        enum: [ "isolation", "compound", null ],
        required: true
    },
    equipment: {
        type: String,
        enum: [ "medicine ball", "dumbbell", "body only", "bands", "kettlebells", 
                    "foam roll", "cable", "machine", "barbell", "exercise ball", 
                    "e-z curl bar", "other", null ],
        required: true
    },
    primaryMuscles: {
        type: [String],
        enum: [ "abdominals", "abductors", "adductors", "biceps",
                    "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower back",
                    "middle back", "neck", "quadriceps", "shoulders", "traps", "triceps" ],
        required: true
    },
    secondaryMuscles: {
        type: [String],
        enum: [ "abdominals", "abductors", "adductors", "biceps",
                    "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower back",
                    "middle back", "neck", "quadriceps", "shoulders", "traps", "triceps" ],
        required: true
    },
    instructions: {
        type: [String],
        required: false
    },
    category: {
        type: String,
        enum: [ "powerlifting", "strength", "stretching", "cardio", "olympic weightlifting", "strongman", "plyometrics" ],
        required: true
    },
    images: {
        type: [String],
        required: true
    }
}) 

module.exports = mongoose.model('PublicExercise', exerciseSchema, 'public-exercises')
