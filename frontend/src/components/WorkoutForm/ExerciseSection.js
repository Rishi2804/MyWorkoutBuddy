import { Button, TextField, Autocomplete, Box, InputBase } from "@mui/material"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteButtonThemeProvider from '../../themes/DeleteButtonThemeProvider'
import AddButtonThemeProvider from "../../themes/AddButtonThemeProvider";
import DeleteIcon from '@mui/icons-material/Delete'

const ExerciseSection = ({ nameList, exercise, exerciseIndex, setName, setSets, displayDelete, removeSelf }) => {

    const cellStyle = {
        width: "100%",
        bgcolor: '#e9eaea',
        textAlign: 'center',
        borderRadius: 10,
        height: 25
    }

    const handleAddSet = () => {
        setSets(exerciseIndex, [...exercise.sets, {reps: null, weight: null}])
    }

    const handleRemoveSet = (index) => {
        const list = [...exercise.sets]
        list.splice(index, 1)
        setSets(exerciseIndex, list)
    }

    const handleChange = (name, value, index) => {
        const list = [...exercise.sets]
        list[index][name] = parseInt(value)
        setSets(exerciseIndex, list)
    }

    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Autocomplete 
                    options={nameList ? nameList : ["exercises not loading"]}
                    groupBy={(item) => item.firstLetter}
                    getOptionLabel={(item) => item.name}
                    value={exercise.name}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Exercise"/>}
                    sx={{width: '80%'}}
                    onChange={(event, value) => setName(exerciseIndex, value)}
                />
                { displayDelete && <DeleteButtonThemeProvider>
                    <Button sx={{float: "right"}} onClick={removeSelf}>
                        <DeleteIcon />
                    </Button>
                </DeleteButtonThemeProvider>}
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
                            exercise.sets.map((set, setIndex) => (
                                <TableRow>
                                    <TableCell>
                                        <Box sx={cellStyle}>{setIndex + 1}</Box>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Box sx={cellStyle}>
                                            <InputBase 
                                                type="number" 
                                                value={set.weight ? set.weight : ''}
                                                sx={{transform: 'translate(30%, 0%)'}} 
                                                inputProps={{min: 0}}
                                                onChange={(e) => handleChange("weight", e.target.value, setIndex)}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={cellStyle}>
                                            <InputBase 
                                                type="number" 
                                                value={set.reps ? set.reps : ''}
                                                sx={{transform: 'translate(30%, 0%)'}} 
                                                inputProps={{min: 0}}
                                                onChange={(e) => handleChange("reps", e.target.value, setIndex)}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <DeleteButtonThemeProvider>
                                            {exercise.sets.length > 1 && <Button onClick={() => handleRemoveSet(setIndex)}><DeleteIcon/></Button>}
                                        </DeleteButtonThemeProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <AddButtonThemeProvider>
                {exercise.sets.length < 7 && <Button variant="contained" onClick={handleAddSet}>Add Set</Button>}
            </AddButtonThemeProvider>
        </>
    )

}

export default ExerciseSection