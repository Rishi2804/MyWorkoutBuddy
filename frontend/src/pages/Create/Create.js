import { Button } from "@mui/material"
import PrimaryButtonThemeProvider from '../../themes/PrimaryButtonThemeProvider'
import EmptyWorkoutModal from '../../components/WorkoutForm/EmptyWorkoutModal'

const Create = () => {
    return (
        <div>
            <h2>Quick Start</h2>
            <EmptyWorkoutModal>
                <PrimaryButtonThemeProvider>
                    <Button variant="contained">Create an Empty Workout</Button>
                </PrimaryButtonThemeProvider>
            </EmptyWorkoutModal>
        </div>
    )
}

export default Create