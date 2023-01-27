import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = ({ user }) => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} workouts={workouts} setWorkouts={setWorkouts} user={user} />
                ))}
            </div>
            <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} user={user} />
        </div>
    );
}

export default Home;