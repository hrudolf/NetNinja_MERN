import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout, workouts, setWorkouts, user }) => {
    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        await response.json();
        if (response.ok) {
            const updatedWorkouts = JSON.parse(JSON.stringify(workouts)).filter(oneWorkout => oneWorkout._id !== workout._id);
            setWorkouts(updatedWorkouts)
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <p>{workout.createdAt.slice(0, 10)}</p>
            <span onClick={handleClick}>🗑️</span>
        </div>
    );
}

export default WorkoutDetails;