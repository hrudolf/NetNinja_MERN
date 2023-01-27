require('dotenv').config();
const port = process.env.PORT;
const morgan = require('morgan');

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//express app
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));
//almost the same:
/* app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
}) */

//routes
app.get('/', (req, res) => {
    /* res.status(200).send('Server is live'); */
    res.json({ mssg: 'Welcome to the app' })
})

app.use('/api/workouts', workoutRoutes);
app.use('/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for reqs
        app.listen(port, () => {
            console.log(`Connected to DB, last server start: ${new Date().toLocaleTimeString()}`);
            console.log(`http://localhost:${port}`);
        })
    })
    .catch((err) => console.log(err))