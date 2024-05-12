require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 1200;

app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/login1(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'login1.html'));
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});