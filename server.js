const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cokieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

//app
const app = express();

//DB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log('DB connected'));

// middlewears
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cokieParser());

//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middlewear
app.use('/api', blogRoutes);
app.use('/api', authRoutes);



//port 
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);

});