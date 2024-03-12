import './Exercises.css'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuthContext } from '../../hooks/useAuthContext'
import ExerciseView from '../../components/ExerciseView/ExerciseView'
import CustomPagination from '../../components/CustomPagination/CustomPagination'
import { TextField } from '@mui/material'
import FilterSelect from '../../components/FilterSelect/FilterSelect'
import { muscles, forces, equipment, mechanics } from '../../global/exerciseEnums'

const Excercises = () => {
    const { user } = useAuthContext()
    const [ publicExercises, setPublicExercises] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ numPages, setNumPages ] = useState(1)
    const [ searchTerm, setSearchTerm ] = useState(null)
    const [ forceFilters, setForceFilters ] = useState('')
    const [ primaryMuscleFilters, setPrimaryMuscleFilters ] = useState([])
    const [ secondaryMuscleFilters, setSecondaryMuscleFilters ] = useState([])
    const [ equipmentFilters, setEquipmentFilters ] = useState('')
    const [ mechanicFilter, setMechanicFilter ] = useState('')

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true)
            const trimmedSearchTerm = searchTerm ? searchTerm.trim() : null
            const response = await fetch(`/api/public-exercises?page=${page}&limit=50` 
                                            + (trimmedSearchTerm ? `&search=${trimmedSearchTerm}` : '')
                                            + (primaryMuscleFilters.length !== 0 ? `&primaryMuscles=${primaryMuscleFilters.join(',')}` : '')
                                            + (secondaryMuscleFilters.length !== 0 ? `&secondaryMuscles=${secondaryMuscleFilters.join(',')}` : '')
                                            + ((forceFilters || forceFilters !== '') ? `&force=${forceFilters}` : '')
                                            + ((equipmentFilters || equipmentFilters !== '') ? `&equipment=${equipmentFilters}` : '')
                                            + ((mechanicFilter || mechanicFilter !== '') ? `&mechanic=${mechanicFilter}` : ''), {
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
    }, [user, page, searchTerm, forceFilters, primaryMuscleFilters, 
            secondaryMuscleFilters, equipmentFilters, mechanicFilter])

    return (
        <div>
            <h2>Excercises</h2>
            <TextField 
                className='search-box'
                variant='filled'
                label='Search'
                onKeyDown={(e) => {if (e.key === 'Enter') {
                                        setSearchTerm(e.target.value)
                                        setPage(1)
                                    }}}
                InputProps={{
                    sx: { input: {backgroundColor: 'white'} }
                }}
                fullWidth
            />
            <div className='filters'>
                <span>Filters:</span>
                <FilterSelect 
                    options={muscles}
                    multiSelect={true}
                    text={"Primary Muscles"}
                    filterValues={primaryMuscleFilters} 
                    setFilterValues={setPrimaryMuscleFilters}
                />
                <FilterSelect 
                    options={muscles} 
                    multiSelect={true}
                    text={"Secondary Muscles"}
                    filterValues={secondaryMuscleFilters} 
                    setFilterValues={setSecondaryMuscleFilters}
                />
                <FilterSelect 
                    options={forces} 
                    multiSelect={false}
                    text={"Force"}
                    filterValues={forceFilters} 
                    setFilterValues={setForceFilters}
                />
                <FilterSelect 
                    options={mechanics} 
                    multiSelect={false}
                    text={"Mechanic"}
                    filterValues={mechanicFilter} 
                    setFilterValues={setMechanicFilter}
                />
                <FilterSelect 
                    options={equipment} 
                    multiSelect={false}
                    text={"Equipment"}
                    filterValues={equipmentFilters} 
                    setFilterValues={setEquipmentFilters}
                />
            </div>
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