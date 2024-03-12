import { useState } from "react"
import { FormControl, FormGroup, Button, TextField, Stack } from "@mui/material"
import CancelButtonThemeProvider from "../../themes/CancelButtonThemeProvider";
import FinishButtonThemeProvider from "../../themes/FinishButtonThemeProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExerciseSection from "./ExerciseSection";
import PrimaryButtonThemeProvider from "../../themes/PrimaryButtonThemeProvider";

// contexts
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutsContext } from "../../hooks/UseWorkoutsContext";

const WorkoutForm = ({ handleClose, namesList }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [ title, setTitle ] = useState('Workout Name')
    const [ date, setDate ] = useState(null)
    const [ duration, setDuration ] = useState(null)
    const [ exercises, setExercises ] = useState([{name: null, sets: [{reps: null, weight: null}]}])

    const handleSumbit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = {title: title, date: date, duration: duration, exercises: exercises}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            handleClose()
        }
    }

    const handleAdd = () => {
        setExercises([...exercises, {name: null, sets: [{reps: null, weight: null}]}])
        console.log(namesList)
    }

    const handleRemove = (index) => {
        const list = [...exercises]
        list.splice(index, 1)
        setExercises(list)
    }

    const setSets = (index, value) => {
        const list = [...exercises]
        list[index].sets = value
        setExercises(list)
    }

    const setName = (index, value) => {
        const list = [...exercises]
        list[index].name = value
        setExercises(list)
    }

    return (
        <form>
            <FormControl fullWidth>
                <div>
                    <FinishButtonThemeProvider>
                        <Button 
                            type="submit"
                            variant="contained"
                            onClick={handleSumbit}
                            sx={{width: '15%', float: "right"}}
                        >
                            Done
                        </Button>
                    </FinishButtonThemeProvider>
                </div>
                <TextField 
                    variant="standard" 
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    inputProps={{style: {fontSize: 25, fontWeight: 550}}}
                    InputProps={{style: {width: '50%'}, disableUnderline: true}}
                    error={emptyFields && emptyFields.includes('title')}
                />
                <Stack direction='row' spacing={4}>
                    <span>Date:</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            onChange={(val) => setDate(val)}
                            sx={{ width: '25%'}}
                            slotProps={{ textField: { variant: 'standard' } }}
                        />
                    </LocalizationProvider>
                    <span>Duration (min):</span>
                    <TextField 
                        type="number" 
                        variant="standard" 
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        inputProps={{min: 0}}
                        sx={{ width: '25%'}}
                        error={emptyFields && emptyFields.includes('duration')}
                    />
                </Stack>
                {
                    exercises.map((exercise, index) => (
                        <FormGroup sx={{marginBottom: '10px'}}>
                            <ExerciseSection 
                                nameList={namesList} 
                                exerciseIndex={index}
                                exercise={exercise}
                                setName={setName}
                                setSets={setSets}
                                displayDelete={exercises.length > 1}
                                removeSelf={() => {handleRemove(index)}}
                            />
                        </FormGroup>
                    ))
                }
                    <PrimaryButtonThemeProvider>
                        <Button 
                            variant="contained"
                            onClick={handleAdd}
                            sx={{marginBottom: '10px'}}
                        >
                            Add Exercise
                        </Button>
                    </PrimaryButtonThemeProvider>
                    <CancelButtonThemeProvider>
                        <Button 
                            variant='contained' 
                            onClick={handleClose}
                        >
                            Cancel Workout
                        </Button>
                    </CancelButtonThemeProvider>
                    {
                        error && <div className="error">{error}</div>
                    }
            </FormControl>
        </form>
    )
}

export default WorkoutForm