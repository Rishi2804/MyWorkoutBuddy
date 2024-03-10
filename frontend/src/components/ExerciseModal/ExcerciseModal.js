import './ExerciseModal.css'
import { useEffect, useState } from 'react'

// MUI components
import { styled } from '@mui/material/styles';
import { Paper, Modal, Backdrop, Fade, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "75%",
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
  display: 'grid',
  gridTemplateColumns: '38% 58%',
  gridGap: '4%'
};

const WorkoutModal = ({ children, exercise }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log(exercise)
    })

    const [ imageIndex, setImageIndex ] = useState(0)

    const EnclosureCard = styled(Paper)(() => ({
        display: 'flex',
        flexDirection: 'column',
        width: '17vw',
        padding: '5px',
        margin: '5px 0',
        marginRight: '1.2em',
        backgroundColor: 'white',
        borderRadius: '25px',
        position: 'relative',
        overflow: 'hidden',
        '& h3': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        '&:hover': {
            '& h3': {
                color: '#58a5f8'
            },
        },
    }));

    const handleImageSrc = () => {
        setImageIndex(imageIndex === 0 ? 1 : 0)
    }

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
            <div className='left-summary'>
                <div className='wrapper'>
                    <img 
                        loading='lazy' 
                        src={exercise.images[imageIndex]} 
                        alt={exercise.id} 
                        className='big-image' 
                        onClick={handleImageSrc}
                    />
                </div>
                <p>Primary Muscles: {exercise.primaryMuscles.join(', ')}</p>
                <p>Secondary Muscles: {exercise.secondaryMuscles.join(', ')}</p>
                <p>Level: {exercise.level}</p>
                <p>Force: {exercise.force}</p>
                <p>Mechanic: {exercise.mechanic ? exercise.mechanic : 'N/A'}</p>
                <p>Equipment: {exercise.equipment}</p>
                <p>Category: {exercise.category}</p>
            </div>
            <div className='right-summary'>
                <h2 className='title'>{exercise.name}</h2>
                <div className='instructions'>
                    {
                        exercise.instructions && exercise.instructions.map((step, stepIndex) => (
                            <p>{(stepIndex + 1) + ". " + step}</p>
                        ))
                    }
                </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );    
}

export default WorkoutModal;