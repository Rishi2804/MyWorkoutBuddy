const express = require('express')
const Workout = require('../models/WorkoutModel')

const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'GET all workouts'})
})

// GET single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single workouts'})
})

// POST a new workout
router.post('/', async (req, res) => {
    const {title, reps, weight} = req.body

    try {
        const workout = await Workout.create({title, reps, weight})
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// DELETE a new workout
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE a workout"})
})

// UPDATE a new workout
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE a workout"})
})

module.exports = router;