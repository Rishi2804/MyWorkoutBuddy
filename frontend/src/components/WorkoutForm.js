import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, reps, weight}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        } else {
            setTitle('')
            setReps('')
            setWeight('')
            setError(null)
            console.log('new workout added', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Reps: </label>
            <input
                type="text"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
            />

            <label>Weight: </label>
            <input
                type="text"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {
                error && <div className="error">{error}</div>
            }
        </form>
    )
}

export default WorkoutForm