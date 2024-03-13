import './Create.css'
import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../../hooks/UseWorkoutsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import PrimaryButtonThemeProvider from '../../themes/PrimaryButtonThemeProvider'
import WorkoutFormModal from '../../components/WorkoutForm/WorkoutFormModal'

import WorkoutView from '../../components/WorkoutView/WorkoutView'

const Create = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [ templates, setTemplates ] = useState([])

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

        const fetchTemplates = async () => {
            const response = await fetch('/api/templates', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setTemplates(json)
            }
        }

        if (user) {
            fetchWorkouts()
            fetchTemplates()
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
            <div className='template-section'>
                <h2 style={{marginRight: '20px'}}>Templates</h2>
                <WorkoutFormModal template>
                    <PrimaryButtonThemeProvider>
                        <Button variant="contained" sx={{borderRadius: '50%', minWidth: 'unset', width: '40px'}}><AddIcon /></Button>
                    </PrimaryButtonThemeProvider>
                </WorkoutFormModal>
            </div>
            <div className="workout-history">
                {
                    templates && templates.map((t) => (
                        <WorkoutView key={t._id} workout={t} template/>
                    ))
                }
            </div>
        </div>
    )
}

export default Create