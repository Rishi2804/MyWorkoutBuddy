import { useEffect, useState } from "react";

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts && workouts.map((w) => (
                        <WorkoutDetails key={w._id} workout={w}/>
                    ))
                }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;