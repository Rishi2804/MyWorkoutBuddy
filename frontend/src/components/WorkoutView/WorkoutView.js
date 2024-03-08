import './WorkoutView.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Stack } from '@mui/material';

const WorkoutDetails = ({ workout }) => {
    const exercises = workout.exercises
    const date = new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(workout.date))

    const totalWeightLifted = () => {
        let total = 0
        exercises.forEach(e => {
            e.sets.forEach(set => {
                total += set.weight
            })
        })
        return total
    }

    const timeFormatter = () => {
        const hour = Math.floor(workout.duration / 60)
        const min = workout.duration % 60
        if (hour > 0 && min > 0) {
            return `${hour}h ${min}min`
        } else if (hour > 0) {
            return `${hour}h`
        } else {
            return `${min}min`
        }
    }

    const exercisesSummaryTransfomer = () => {
        const strings = []
        const firstFourExercises = workout.exercises.slice(0, 4)
        firstFourExercises.forEach(e => {
            strings.push(`${e.sets.length} x ${e.name}`)
        })
        return strings
    }
    
    const previewList = exercisesSummaryTransfomer()

    return (
        <div className='media'>
            <h3 className='title'>{workout.title}</h3>
            <div className='details'>
                <Stack direction="row" alignItems="center" gap={1}>
                    <CalendarMonthIcon />
                    <span className='caption'>{date}</span>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <AccessTimeIcon />
                    <span className='caption'>{timeFormatter()}</span>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <FitnessCenterIcon />
                    <span className='caption'>{totalWeightLifted()}</span>
                </Stack>
            </div>
            <div className='list'>
                {
                    previewList && previewList.map((s) => (
                        <span className='workout list-item'>{s}</span>
                    ))
                }
                {
                    exercises.length > 4 && (
                        <span>. . .</span>
                    )
                }
            </div>
        </div>
    )
}

export default WorkoutDetails