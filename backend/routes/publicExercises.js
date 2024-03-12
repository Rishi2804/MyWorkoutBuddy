const express = require('express')
const { getExcersies, getExcersie, getExerciseNames } = require('../controllers/pubExerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all public exercises
router.get('/', getExcersies)

// GET the names of the exercises
router.get('/names', getExerciseNames)

// GET single public exercise
router.get('/:id', getExcersie)

module.exports = router;