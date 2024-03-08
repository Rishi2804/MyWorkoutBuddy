import { useState } from 'react';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  height: "60%",
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const WorkoutModal = ({ children }) => {
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
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden'
  }));

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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default WorkoutModal;