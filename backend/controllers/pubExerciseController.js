const PublicExercise = require('../models/publicExercisesModel')
const mongoose = require('mongoose')

// get all exercises
const getExcersies = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * pageSize;

    const conditions = [];
    const searchTerm = req.query.search;
    const primaryMusclesList = req.query.primaryMuscles;
    const secondaryMusclesList = req.query.secondaryMuscles;
    const force = req.query.force;

    // add name search if parameter exists
    if (searchTerm) {
        try {
            const search = new RegExp(searchTerm, 'i')
            conditions.push({ name: search })
        } catch (error) {
            console.error('Error creating RegExp: ', error.message);
        }
    }

    // add select filters
    if (primaryMusclesList) conditions.push({ primaryMuscles: { $in : primaryMusclesList.split(',') } })
    if (secondaryMusclesList) conditions.push({ secondaryMuscles: { $in : secondaryMusclesList.split(',') } })
    if (force) conditions.push({ force: force })


    let query = {};
    if (conditions.length > 1) {
        query = { $and : conditions }
    } else if (conditions.length === 1) {
        query = conditions[0]
    }
    
    const total = await PublicExercise.countDocuments(query)

    const pagesCount = Math.ceil(total / pageSize)

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