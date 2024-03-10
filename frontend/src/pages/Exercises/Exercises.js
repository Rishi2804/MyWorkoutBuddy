import './Exercises.css'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuthContext } from '../../hooks/useAuthContext'
import ExerciseView from '../../components/ExerciseView/ExerciseView'
import CustomPagination from '../../components/CustomPagination/CustomPagination'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Excercises = () => {
    const { user } = useAuthContext()
    const [ publicExercises, setPublicExercises] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ numPages, setNumPages ] = useState(1)
    const [ searchTerm, setSearchTerm ] = useState(null)

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true)
            const trimmedSearchTerm = searchTerm ? searchTerm.trim() : null
            const response = await fetch(`/api/public-exercises?page=${page}&limit=50` 
                                            + (trimmedSearchTerm ? `&search=${trimmedSearchTerm}` : ''), {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setPublicExercises(json.exercises)
                setNumPages(json.pagesCount)
            }
            setLoading(false)
        }

        if (user) {
            fetchExercises()
        }
    }, [user, page, searchTerm])

    return (
        <div>
            <h2>Excercises</h2>
            <TextField 
                className='search-box'
                variant='filled'
                label='Search'
                onKeyDown={(e) => {if (e.key === 'Enter') setSearchTerm(e.target.value)}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
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
            {numPages > 1 && (<CustomPagination setPage={setPage} numPages={numPages}/>)}
        </div>
    )
}

export default Excercises