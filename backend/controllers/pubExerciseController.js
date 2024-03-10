const PublicExercise = require('../models/publicExercisesModel')
const mongoose = require('mongoose')

// get all exercises
const getExcersies = async (req, res) => {
    const exercises = await PublicExercise.find({}).sort({ name: 1 })

    res.status(200).json(exercises)
}

// get single
const getExcersie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such exercise"})
    }

    const exercise = await Workout.findById(id)

    if (!exercise) {
        return res.status(404).json({error: "No such exercise"})
    }

    res.status(200).json(exercise)
}

module.exports = { getExcersies, getExcersie }