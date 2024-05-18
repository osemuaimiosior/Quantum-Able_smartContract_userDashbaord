require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const schedule = require('node-schedule');
const axios = require('axios');

const getData = require('./scheduleFunctions/etfDataSchedule');

const PORT = process.env.PORT || 1200;

// built-in middleware to read json file into the server json
app.use(express.json());

// To handle form data
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/registration', require('./routes/api/register'));
app.use('/eventFilter', require('./routes/api/eventLogsFilter'));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/login1(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'login1.html'));
})


// schedule.scheduleJob('*/1 * * * *', () =>{ getData()});


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});