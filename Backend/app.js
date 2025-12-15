const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
//const router = require('./routers/...')

const app = express();
app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
    res.json({
        name: "Discretion",
        description: "Send and receive private messages."
    })
})

//app.use('/...', router)


module.exports = app;