import WorkoutForm from './WorkoutForm'
import { useState, useEffect, useRef } from 'react';
import { Box, Modal } from '@mui/material';

// hooks
import { useAuthContext } from '../../hooks/useAuthContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "85%",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll'
  };

const WorkoutFormModal = ({ workout, template, create, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const { user } = useAuthContext()
  const namesList = useRef([])

  useEffect(() => {
    const fetchExerciseNames = async () => {
        const response = await fetch('/api/public-exercises/names', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            const names = json.map((item) => {
              const firstLetter = item.name[0].toUpperCase();
              return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...item,
              }
            })
            namesList.current = names
        }
    }

    if (user) {
      fetchExerciseNames()
    }
}, [user])

  return (
    <div>
        <div onClick={handleOpen}>
            { children }
        </div>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <WorkoutForm handleClose={handleClose} namesList={namesList.current} workout={workout} template={template} create={create}/>
        </Box>
      </Modal>
    </div>
  );
}

export default WorkoutFormModal