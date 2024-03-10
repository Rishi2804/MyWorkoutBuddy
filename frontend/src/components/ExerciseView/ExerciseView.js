import ExcerciseModal from '../ExerciseModal/ExcerciseModal'

const ExerciseView = ({ exercise }) => {

    return (
        <ExcerciseModal exercise={exercise}>
            <img src={exercise.images[0] + "?tr=w-250,h-180"} alt={exercise.id} />
            <h3>{exercise.name}</h3>
            <div className="details">
                <span>{exercise.level}</span>
                <span>{exercise.category}</span>
            </div>
        </ExcerciseModal>
    )
}

export default ExerciseView