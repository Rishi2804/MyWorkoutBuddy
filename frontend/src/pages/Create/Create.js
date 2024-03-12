import { useEffect } from "react"
import { useWorkoutsContext } from "../../hooks/UseWorkoutsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

import { Button } from "@mui/material"
import PrimaryButtonThemeProvider from '../../themes/PrimaryButtonThemeProvider'
import WorkoutFormModal from '../../components/WorkoutForm/WorkoutFormModal'

const Create = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
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
            <h2>Quick Start</h2>
            <WorkoutFormModal>
                <PrimaryButtonThemeProvider>
                    <Button variant="contained">Create an Empty Workout</Button>
                </PrimaryButtonThemeProvider>
            </WorkoutFormModal>
        </div>
    )
}

export default Create