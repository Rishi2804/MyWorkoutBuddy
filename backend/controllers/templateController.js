const Template = require('../models/templateModel')
const mongoose = require('mongoose')

// get all workouts
const getTemplates = async (req, res) => {
    const user_id = req.user._id

    const templates = await Template.find({ user_id })

    res.status(200).json(templates)
}


// get single workout
const getTemplate = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such template"})
    }

    const template = await Template.findById(id)

    if (!template) {
        return res.status(404).json({error: "No such template"})
    }

    res.status(200).json(template)
}

// helper method
const checkEmptyFields = (reqBody) => {
    const { title, exercises } = reqBody

    // Make sure none of the fields are empty
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!exercises || exercises.length === 0) {
        emptyFields.push('exercises')
    }

    if (emptyFields.length > 0) {
        return { error: 'Please fill in all the fields', emptyFields }
    }
}

// create new workout
const createTemplate = async (req, res) => {
    const { title, exercises } = req.body

    const errorMessage = checkEmptyFields(req.body)

    if (errorMessage) {
        return res.status(400).json(errorMessage)
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const template = await Template.create({title, exercises, user_id})
        res.status(200).json(template)
    } catch (err) {
        res.status(400).json({error: err.message, emptyFields})
    }
}

// delete a workout
const deleteTemplate = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such template"})
    }

    const template = await Template.findByIdAndDelete(id)

    if (!template) {
        return res.status(400).json({error: "No such template"})
    }

    res.status(200).json(template)
}

// update a workout
const updateTemplate = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such template"})
    }

    const errorMessage = checkEmptyFields(req.body)

    if (errorMessage) {
        return res.status(400).json(errorMessage)
    }

    const template = await Template.findByIdAndUpdate(id, {
        ...req.body
    })

    if (!template) {
        return res.status(400).json({error: "No such template"})
    }

    res.status(200).json(template)
}

module.exports = {
    getTemplates,
    getTemplate,
    createTemplate,
    deleteTemplate,
    updateTemplate
}