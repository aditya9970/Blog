const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cokieParser = require('cokie-parser');
const cors = require('cors');
require('dotenv').config;

//app

const app = express();

// middlewears
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cokieParser())

//cors
app.use(cors())

//routes
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() })
})

//port 
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);

});