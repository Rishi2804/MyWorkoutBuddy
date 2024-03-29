import { useState } from "react"
import { FormControl, FormGroup, Button, TextField, Stack } from "@mui/material"
import CancelButtonThemeProvider from "../../themes/CancelButtonThemeProvider";
import FinishButtonThemeProvider from "../../themes/FinishButtonThemeProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExerciseSection from "./ExerciseSection";
import PrimaryButtonThemeProvider from "../../themes/PrimaryButtonThemeProvider";
import dayjs from "dayjs";

// contexts
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutsContext } from "../../hooks/UseWorkoutsContext";
import { useTemplatesContext } from "../../hooks/useTemplatesContext";


const WorkoutForm = ({ handleClose, namesList, workout, template, create }) => {
    const { dispatch: dispatchWorkout } = useWorkoutsContext()
    const { dispatch: dispatchTemplate } = useTemplatesContext()
    const { user } = useAuthContext()
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [ title, setTitle ] = useState(workout ? workout.title : 'Workout Name')
    const [ date, setDate ] = useState(workout && !template ? dayjs(new Date(workout.date)) : null)
    const [ duration, setDuration ] = useState(workout && !template ? workout.duration : null)
    const [ exercises, setExercises ] = useState(workout ? workout.exercises :[{name: null, sets: [{reps: null, weight: null}]}])

    const handleCreate = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = {title: title, date: date, duration: duration, exercises: exercises}

        const response = await fetch('/api/' + (!template ? 'workouts' : 'templates'), {
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
            const error = document.querySelector('div.error')
            if (error) error.scrollIntoView({behavior: "smooth", block: "start"})
        } else {
            console.log('new workout added', json)
            if (!template) dispatchWorkout({type: 'CREATE_WORKOUT', payload: json})
            else dispatchTemplate({type: 'CREATE_TEMPLATE', payload: json})
            handleClose()
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const updatedWorkout = {title: title, ...(!template ? {date: date, duration: duration} : {}), exercises: exercises}

        const response = await fetch('/api/' + (!template ? 'workouts/' : 'templates/') + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedWorkout),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            const error = document.querySelector('div.error')
            if (error) error.scrollIntoView({behavior: "smooth", block: "start"})
        } else {
            const updatedJson = {_id: workout._id, ...updatedWorkout}
            console.log('workout updated', updatedJson)
            if (!template) dispatchWorkout({type: 'UPDATE_WORKOUT', payload: updatedJson})
            else dispatchTemplate({type: 'UPDATE_TEMPLATE', payload: updatedJson})
            handleClose()
        }
    }

    const handleSubmit = (e) => {
        if (workout && !create) {
            handleUpdate(e)
        } else {
            handleCreate(e)
        }
    }

    const handleAdd = () => {
        setExercises([...exercises, {name: null, sets: [{reps: null, weight: null}]}])
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
                            onClick={handleSubmit}
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
                    InputProps={{style: {width: '50%'}}}
                    error={emptyFields && emptyFields.includes('title')}
                />{
                    !template && <Stack direction='row' spacing={4} alignItems='center' style={{marginTop: '15px'}}>
                                    <span>Date:</span>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker 
                                            onChange={(val) => setDate(val)}
                                            value={date}
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
                }
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
                            {(workout && !create) ? "Cancel Edit" : ((!template || create) ? "Cancel Workout" : "Cancel Template")}
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