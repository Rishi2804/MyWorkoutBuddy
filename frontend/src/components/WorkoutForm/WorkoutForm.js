import { useState } from "react"
import { FormControl, FormGroup, Button, TextField } from "@mui/material"
import CancelButtonThemeProvider from "../../themes/CancelButtonThemeProvider";
import FinishButtonThemeProvider from "../../themes/FinishButtonThemeProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExerciseSection from "./ExerciseSection";

const WorkoutForm = ({ handleClose }) => {
    const [ name, setName ] = useState('Workout Name')
    const [ date, setDate ] = useState(null)
    const [ exercises, setExercises ] = useState([{sets: []}])
    const exerciseNames = ["bench", "squat", "pulldown"]

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{style: {fontSize: 25, fontWeight: 550}}}
                    InputProps={{style: {width: '50%'}, disableUnderline: true}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        onChange={(val) => setDate(val)}
                        sx={{ width: '25%'}}
                        slotProps={{ textField: { variant: 'standard', } }}
                    />
                </LocalizationProvider>
                <FormGroup>
                    <ExerciseSection exercises={exerciseNames}/>
                </FormGroup>
                    <CancelButtonThemeProvider>
                        <Button 
                            variant='contained' 
                            onClick={handleClose}
                            fullWidth
                        >
                            Cancel Workout
                        </Button>
                    </CancelButtonThemeProvider>
            </FormControl>
        </form>
    )
}

export default WorkoutForm