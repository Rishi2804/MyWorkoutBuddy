import './Exercises.css'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuthContext } from '../../hooks/useAuthContext'
import ExerciseView from '../../components/ExerciseView/ExerciseView'

const Excercises = () => {
    const { user } = useAuthContext()
    const [ publicExercises, setPublicExercises] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true)

            const response = await fetch('/api/public-exercises', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setPublicExercises(json)
            }
            setLoading(false)
        }

        if (user) {
            fetchExercises()
        }
    }, [user])

    return (
        <div>
            <h2>Excercises</h2>
            {
                loading && (
                        <>
                            <p>Loading...</p>
                            <CircularProgress />
                        </>
                    )
            }
            {
                !loading && 
                <div className='exercise-list'>
                    {
                        publicExercises && publicExercises.map((e) => (
                            <ExerciseView key={e._id} exercise={e} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Excercises