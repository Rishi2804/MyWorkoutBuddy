const express = require('express')
const {
    getTemplates,
    getTemplate,
    createTemplate,
    deleteTemplate,
    updateTemplate
} = require('../controllers/templateController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all templates
router.get('/', getTemplates)

// GET single template
router.get('/:id', getTemplate)

// POST a new template
router.post('/', createTemplate)

// DELETE a new template
router.delete('/:id', deleteTemplate)

// UPDATE a new template
router.patch('/:id', updateTemplate)

module.exports = router;