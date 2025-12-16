const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');

const charRouter = require('./routers/characters');
const storyRouter = require('./routers/stories');
const userRouter = require('./routers/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
    res.json({
        name: "API Homepage",
        description: "Use other things."
    })
})

app.use("/characters", charRouter);
app.use("/stories", storyRouter);
app.use("/users", userRouter);

module.exports = app;