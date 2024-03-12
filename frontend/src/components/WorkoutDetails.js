import { useWorkoutsContext } from "../hooks/UseWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.exercises[0].name}</h4>
            <p><strong>Weight: </strong>{workout.exercises[0].sets[0].weight}</p>
            <p><strong>Reps: </strong>{workout.exercises[0].sets[0].reps}</p>
            <p>{workout.date}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails