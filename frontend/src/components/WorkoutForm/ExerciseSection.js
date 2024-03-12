import { useState } from "react";
import { Button, TextField, Autocomplete, Box, InputBase } from "@mui/material"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteButtonThemeProvider from '../../themes/DeleteButtonThemeProvider'
import AddButtonThemeProvider from "../../themes/AddButtonThemeProvider";
import DeleteIcon from '@mui/icons-material/Delete'

const ExerciseSection = ({ exercises }) => {

    const [ sets, setSets ] = useState([{reps: null, weight: null}])

    const cellStyle = {
        width: "100%",
        height: "100%",
        bgcolor: '#e9eaea',
        textAlign: 'center',
        borderRadius: 10,
        height: 25
    }

    const handleAddSet = () => {
        setSets([...sets, {reps: null, weight: null}])
    }

    const handleRemoveSet = (index) => {
        const list = [...sets]
        list.splice(index, 1)
        setSets(list)
    }

    const handleChange = (name, value, index) => {
        const list = [...sets]
        list[index][name] = parseInt(value)
        setSets(list)
    }

    return (
        <>
            <div style={{display: "flex", alignItems: "center"}}>
                <Autocomplete 
                    options={exercises}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Exercise"/>}
                    sx={{width: '80%'}}
                />
                <DeleteButtonThemeProvider>
                    <Button sx={{float: "right"}}>
                        <DeleteIcon />
                    </Button>
                </DeleteButtonThemeProvider>
            </div>
            <TableContainer style={{maxHeight: 'unset'}}>
                <Table size='small'>
                    <colgroup>
                        <col width='10%' />
                        <col width='55%' />
                        <col width='15%' />
                        <col width='15%' />
                        <col width='5%' />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{fontWeight: 600}}>Set</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center' sx={{fontWeight: 600}}>Weight</TableCell>
                            <TableCell align='center' sx={{fontWeight: 600}}>Reps</TableCell>
                            <TableCell><Box sx={{width: '35px'}}></Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sets.map((set, index) => (
                                <TableRow>
                                    <TableCell>
                                        <Box sx={cellStyle}>{index + 1}</Box>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Box sx={cellStyle}>
                                            <InputBase 
                                                type="number" 
                                                value={set.weight}
                                                sx={{transform: 'translate(30%, 0%)'}} 
                                                inputProps={{min: 0}}
                                                onChange={(e) => handleChange("weight", e.target.value, index)}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={cellStyle}>
                                            <InputBase 
                                                type="number" 
                                                value={set.reps}
                                                sx={{transform: 'translate(30%, 0%)'}} 
                                                inputProps={{min: 0}}
                                                onChange={(e) => handleChange("reps", e.target.value, index)}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteButtonThemeProvider>
                                            {sets.length > 1 && <Button onClick={() => handleRemoveSet(index)}><DeleteIcon/></Button>}
                                        </DeleteButtonThemeProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <AddButtonThemeProvider>
                {sets.length < 7 && <Button variant="contained" onClick={handleAddSet}>Add Set</Button>}
            </AddButtonThemeProvider>
        </>
    )

}

export default ExerciseSection