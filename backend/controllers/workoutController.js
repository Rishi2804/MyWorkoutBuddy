const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({date: -1})

    res.status(200).json(workouts)
}


// get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
    const { title, date, duration, exercises } = req.body

    // Make sure none of the fields are empty
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (!duration) {
        emptyFields.push('duration')
    }
    if (!exercises || exercises.length === 0) {
        emptyFields.push('exercises')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // Make sure each exercise has sets
    const exercisesWithoutSets = exercises.filter(exercise => !exercise.sets || exercise.sets.length === 0)
    if (exercisesWithoutSets.length > 0) {
        return res.status(400).json({ error: 'Each exercise must have sets' })
    }

    // Make sure the excercises have names
    const excercisesWithoutName = exercises.filter(exercise => !exercise.name)
    if (excercisesWithoutName.length > 0) {
        return res.status(400).json({ error: 'Each exercise must have a name' })
    }

    // Make sure the sets have both weights and reps
    let setsWithoutWeightsOrReps = []
    exercises.forEach(exercise => {
        exercise.sets.forEach((set, setIndex) => {
            if (!set.weight || !set.reps) {
                setsWithoutWeightsOrReps.push({ exercise: exercise.name, set: setIndex })
            }
        })
    })

    if (setsWithoutWeightsOrReps.length > 0) {
        return res.status(400).json({ error: 'Each set must have both weights and reps', setsWithoutWeightsOrReps })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, date, duration, exercises, user_id})
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message, emptyFields})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findByIdAndDelete(id)

    if (!workout) {
        return res.status(400).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findByIdAndUpdate(id, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}