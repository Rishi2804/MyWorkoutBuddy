import { Button } from "@mui/material"
import PrimaryButtonThemeProvider from '../../themes/PrimaryButtonThemeProvider'

const Create = () => {
    return (
        <div>
            <h3>Quick Start</h3>
            <PrimaryButtonThemeProvider>
                <Button variant="contained">Create an Empty Workout</Button>
            </PrimaryButtonThemeProvider>
        </div>
    )
}

export default Create