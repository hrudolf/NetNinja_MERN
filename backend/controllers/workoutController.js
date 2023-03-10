const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}

// get a single wo
const getWorkout = async (req, res) => {
    const { id } = req.params;
    //const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: 'Invalid Object ID' })
    }

    const workout = await Workout.findById(id).sort({ createdAt: -1 });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout);
}

// post a new wo
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    // req.body // --> app.use(express.json()) middleware NEEDED to access req.body

    //add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a wo
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    //const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: 'Invalid Object ID' })
    }

   const workout = await Workout.findByIdAndDelete(id);
   //const workout = await Workout.findOneAndDelete({_id: id}); //works as well

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout);
}

// update a wo
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ error: 'Invalid Object ID' })
    }

   const workout = await Workout.findByIdAndUpdate(id, {...req.body});
   //const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body}); //should work as well

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout);
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}