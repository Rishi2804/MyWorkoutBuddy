import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const ExerciseView = ({ exercise }) => {

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
            whiteSpace: 'nowrap', // Prevent wrapping
            overflow: 'hidden', // Hide overflow
            textOverflow: 'ellipsis' // Show ellipsis for overflow
        },
        '&:hover': {
            '& h3': {
                color: '#58a5f8'
            },
        },
    }));

    return (
        <EnclosureCard>
            <img src={exercise.images[0] + "?tr=w-250,h-180"} alt={exercise.id}/>
            <h3>{exercise.name}</h3>
            <div className="details">
                <span>{exercise.category}</span>
                <span>{exercise.level}</span>
            </div>
        </EnclosureCard>
    )
}

export default ExerciseView