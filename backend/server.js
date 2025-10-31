const express = require('express');
const cors = require('cors');
const app = express();
const tasksRouter = require('./routes/tasks');
const authRouter = require('./auth');
const insightsRouter = require('./insights');
const { port } = require('./config/config');


app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);
app.use('/insights', insightsRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));