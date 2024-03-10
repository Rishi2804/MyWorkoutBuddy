const PublicExercise = require('../models/publicExercisesModel')
const mongoose = require('mongoose')

// get all exercises
const getExcersies = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * pageSize;
    const total = await PublicExercise.countDocuments();

    const pagesCount = Math.ceil(total / pageSize)

    let query = {}

    if (req.query.search) {
        const searchTerm = new RegExp(req.query.search, 'i')
        query = { $or: [ {name: searchTerm} ]}
    }

    const exercises = await PublicExercise.find(query)
                                .sort({ name: 1 })
                                .skip(skip)
                                .limit(pageSize)

    res.status(200).json({pagesCount, exercises})
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