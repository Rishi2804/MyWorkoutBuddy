require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const pubExerciseRoutes = require('./routes/publicExercises')
const templateRoutes = require('./routes/templates')

// Express App
const app = express()

// middleware
app.use(cors({
    origin: 'http://localhost:4000'
}))
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/public-exercises', pubExerciseRoutes)
app.use('/api/templates', templateRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on port", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err)
    })
