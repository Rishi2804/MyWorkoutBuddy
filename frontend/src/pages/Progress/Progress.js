import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
// eslint-disable-next-line
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2'
import { Paper } from '@mui/material'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useWorkoutsContext } from '../../hooks/UseWorkoutsContext'

defaults.maintainAspectRatio = false
defaults.plugins.title.display = true
defaults.plugins.legend.display = false


const Progress = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [ workoutsPerWeek, setWorkoutsPerWeek ] = useState([])
    const [ weightLiftedEachWorkout, setWeightLiftedEachWorkout ] = useState([])

    const getWeekRange = (date) => {
        const startOfWeek = new Date(date)
        // Move to Sunday
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        // Move to Saturday
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toDateString()} - ${endOfWeek.toDateString()}`;
    }

    const getWorkoutsPerWeekData = () => {
        const datesArray = workouts.map(w => new Date(w.date))

        const occurrencesByWeek = {}

        // Generate week ranges for the last 15 weeks
        for (let i = 0; i < 8; i++) {
            const startOfWeek = new Date()
            // Move to Sunday of the i-th week ago
            startOfWeek.setDate(startOfWeek.getDate() - 7 * i - startOfWeek.getDay())

            const weekRange = getWeekRange(startOfWeek)
            // Initialize with 0 occurrences
            occurrencesByWeek[weekRange] = 0
        }

        datesArray.forEach(date => {
            const weekRange = getWeekRange(date)

            // If weekRange in the occurrencesByWeek object, increment it
            if (occurrencesByWeek.hasOwnProperty(weekRange)) occurrencesByWeek[weekRange]++
        })

        const results = Object.keys(occurrencesByWeek)
            .sort()
            .map(key => ({ label: key, number: occurrencesByWeek[key] }))
        
        setWorkoutsPerWeek(results)
    }

    const totalWeightLifted = (exercises) => {
        let total = 0
        exercises.forEach(e => {
            e.sets.forEach(set => {
                total += (set.weight * set.reps)
            })
        })
        return total
    }

    const getWeightLiftedEachWorkout = () => {
        let data = []
        workouts.forEach(w => {
            const totalWeight = totalWeightLifted(w.exercises)
            const stringDate = new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(w.date))
            data.push({label: stringDate, totalWeight: totalWeight})
        })
        data.reverse()
        setWeightLiftedEachWorkout(data)
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://myworkoutbuddy-backend.onrender.com/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }

            getWorkoutsPerWeekData()
            getWeightLiftedEachWorkout()
        }

        if (user) {
            fetchWorkouts()
        }
        // eslint-disable-next-line
    }, [dispatch, user])

    const EnclosureCard = styled(Paper)(() => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '85%',
        padding: '5px',
        margin: '0 auto',
        marginBottom: '50px',
        backgroundColor: 'white',
        borderRadius: '25px',
        position: 'relative',
    }));

    return (
        <div>
            <h2>Progress</h2>
            <EnclosureCard>
                <Bar 
                    data={{
                        labels: workoutsPerWeek.map(data => data.label),
                        datasets: [
                            {
                                label: "Workouts per week",
                                data: workoutsPerWeek.map(data => data.number),
                                borderRadius: 7
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        hover: {
                            mode: 'label'
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 7,
                                ticks: {
                                    stepSize: 1,
                                }
                            }
                        },
                        plugins: {
                            title: {
                                text: "Workouts Each Week",
                                color: "black",
                                font: {
                                    size: 20
                                }
                            }
                        },
                    }}
                />
            </EnclosureCard>
            <EnclosureCard>
                <Line 
                    data={{
                        labels: weightLiftedEachWorkout.map(data => data.label),
                        datasets: [
                            {
                                label: "Total weight each workout",
                                data: weightLiftedEachWorkout.map(data => data.totalWeight),
                                borderRadius: 7
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        hover: {
                            mode: 'label'
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            title: {
                                text: "Weight Lifted Each Workout",
                                color: "black",
                                font: {
                                    size: 20
                                }
                            }
                        },
                        elements: {
                            line: {
                                tension: 0.5
                            }
                        }
                    }}
                />
            </EnclosureCard>
        </div>
    )
}

export default Progress