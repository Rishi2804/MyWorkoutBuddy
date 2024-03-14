import './History.css'
import { useEffect } from 'react'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useWorkoutsContext } from '../../hooks/UseWorkoutsContext'

// components
import WorkoutView from '../../components/WorkoutView/WorkoutView'

const History = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://myworkoutbuddy-backend.onrender.com/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])


    return (
        <div>
            <h2>History</h2>
            <div className='workout-history'>
                {
                    workouts && workouts.map((w) => (
                        <WorkoutView key={w._id} workout={w} />
                    ))
                }
            </div>
        </div>
    )
}

export default History