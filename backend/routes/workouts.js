const express = require('express')
const {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a new workout
router.delete('/:id', deleteWorkout)

// UPDATE a new workout
router.patch('/:id', updateWorkout)

module.exports = router;