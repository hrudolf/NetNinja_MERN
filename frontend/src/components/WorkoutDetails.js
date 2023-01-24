const WorkoutDetails = ({ workout, workouts, setWorkouts }) => {
    const handleClick = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE"
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
            <p>{workout.createdAt.slice(0, 10)}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    );
}

export default WorkoutDetails;