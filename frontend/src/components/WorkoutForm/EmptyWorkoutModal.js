import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import WorkoutForm from '../WorkoutForm/WorkoutForm'

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

const EmpyWorkoutModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <div onClick={handleOpen}>
            { children }
        </div>
        <Modal
            open={open}
            //onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <WorkoutForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default EmpyWorkoutModal