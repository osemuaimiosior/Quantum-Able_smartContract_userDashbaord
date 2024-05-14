require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 1200;

// built-in middleware to read json file into the server json
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/registration', require('./routes/api/register'))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/login1(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'login1.html'));
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});