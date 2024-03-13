import './WorkoutModal.css'
import { useState } from 'react'

// MUI components
import { styled } from '@mui/material/styles';
import { Button, Paper, Modal, Backdrop, Fade, Box, Stack } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeleteButtonThemeProvider from '../../themes/DeleteButtonThemeProvider';
import WorkoutFormModal from '../WorkoutForm/WorkoutFormModal'

// Contexts
import { useWorkoutsContext } from "../../hooks/UseWorkoutsContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  height: "75%",
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll'
};

const WorkoutModal = ({ children, workout, details, template }) => {

  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const EnclosureCard = styled(Paper)(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '22vw',
    padding: '5px',
    margin: '5px 0',
    marginRight: '1.2em',
    backgroundColor: 'white',
    borderRadius: '25px',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }));

  const handleDeleteClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/' + (!template ? 'workouts/' : 'templates/') + workout._id, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
        if (!template) dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
    setTimeout(3000)
    handleClose()
  }

  // Deep copy so invalid values are not shown
  const copyWorkout = JSON.parse(JSON.stringify(workout))
  
  return (
    <div>
      <EnclosureCard 
          className="media"
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
      >
          {children}
      </EnclosureCard>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='actions' style={template ? {justifyContent: 'space-between'} : null}>
              {
                template && <WorkoutFormModal workout={copyWorkout} create >
                              <Button variant='contained'>
                                Create
                              </Button>
                            </WorkoutFormModal>
              }
              <div className='universal-actions'>
                <WorkoutFormModal workout={copyWorkout} template={template}>
                  <Button variant='contained' >
                    Edit
                  </Button>
                </WorkoutFormModal>
                <DeleteButtonThemeProvider>
                  <Button variant='contained' onClick={handleDeleteClick} style={{marginLeft: '10px'}}>
                    <DeleteIcon style={{ fontSize: 18 }}/>
                  </Button>
                </DeleteButtonThemeProvider>
              </div>
            </div>
            <h2 className='header'>{workout.title}</h2>
            {
              !template && <div className='details-section'>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <CalendarMonthIcon />
                                <span className='caption'>{details.date}</span>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <AccessTimeIcon />
                                <span className='caption'>{details.duration}</span>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <FitnessCenterIcon />
                                <span className='caption'>{details.totalWeight}</span>
                            </Stack>
                        </div>
            }
            <div className='detailed-exercises' style={{overflowY: 'scroll'}}>
              {
                workout.exercises.map((e) => (
                  <div>
                    <h3 className='exercise-name'>{e.name}</h3>
                    <TableContainer>
                      <Table size='small'>
                        <colgroup>
                          <col width='10%' />
                          <col width='60%' />
                          <col width='15%' />
                          <col width='15%' />
                        </colgroup>
                        <TableHead>
                          <TableRow>
                            <TableCell align='center' sx={{fontWeight: 600}}>Set</TableCell>
                            <TableCell></TableCell>
                            <TableCell align='center' sx={{fontWeight: 600}}>Weight</TableCell>
                            <TableCell align='center' sx={{fontWeight: 600}}>Reps</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            e.sets.map((set, setIndex) => (
                              <TableRow>
                                <TableCell align='center'>{setIndex + 1}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align='center'>{set.weight}</TableCell>
                                <TableCell align='center'>{set.reps}</TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ))
              }
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default WorkoutModal;