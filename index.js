require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const schedule = require('node-schedule');
const axios = require('axios');

const PORT = process.env.PORT || 1200;

// built-in middleware to read json file into the server json
app.use(express.json());

// To handle form data
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/registration', require('./routes/api/register'))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/login1(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'login1.html'));
})

const options = {
    method: 'GET',
    url: 'https://ms-finance.p.rapidapi.com/market/v3/get-realtime-data',
    params: {
      performanceIds: '0P00002DCS'
    },
    headers: {
      'X-RapidAPI-Key': "0e0c397208msh18ef3e23db904bep1c3546jsn86e92cf3d761",
      'X-RapidAPI-Host': 'ms-finance.p.rapidapi.com'
    }
  };

const getData = async() =>{
try {
    const response = await axios.request(options);
    const {value} = response.data['0P00002DCS'].lastPrice;
    const date = response.data['0P00002DCS'].lastPrice.date["value"];
    console.log("Prive value is "+ value);
    console.log("Date value is "+ date);
  } catch (error) {
      console.error(error);
  }}

  schedule.scheduleJob('*/1 * * * *', () =>{ getData()});


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});