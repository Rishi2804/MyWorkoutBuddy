import { useState } from "react"
import { FormControl, FormGroup, Button, TextField, Stack } from "@mui/material"
import CancelButtonThemeProvider from "../../themes/CancelButtonThemeProvider";
import FinishButtonThemeProvider from "../../themes/FinishButtonThemeProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExerciseSection from "./ExerciseSection";
import PrimaryButtonThemeProvider from "../../themes/PrimaryButtonThemeProvider";

const WorkoutForm = ({ handleClose }) => {
    const [ title, setTitle ] = useState('Workout Name')
    const [ date, setDate ] = useState(null)
    const [ exercises, setExercises ] = useState([{name: null, sets: [{reps: null, weight: null}]}])
    const exerciseNames = ["bench", "squat", "pulldown"]

    const handleAdd = () => {
        console.log(exercises)
        setExercises([...exercises, {name: null, sets: [{reps: null, weight: null}]}])
    }

    const handleRemove = (index) => {
        const list = [...exercises]
        console.log(list)
        console.log(list.splice(index, 1))
        console.log(list)
        setExercises(list)
        console.log(exercises)
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
                            variant="contained"
                            sx={{width: '15%', float: "right"}}
                        >
                            Finish
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
                        inputProps={{min: 0}}
                        sx={{ width: '25%'}}
                    />
                </Stack>
                {
                    exercises.map((exercise, index) => (
                        <FormGroup sx={{marginBottom: '10px'}}>
                            <ExerciseSection 
                                nameList={exerciseNames} 
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
            </FormControl>
        </form>
    )
}

export default WorkoutForm