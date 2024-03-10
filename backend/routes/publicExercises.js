const express = require('express')
const { getExcersies, getExcersie } = require('../controllers/pubExerciseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all public exercises
router.get('/', getExcersies)

// GET single public exercise
router.get('/:id', getExcersie)

module.exports = router;