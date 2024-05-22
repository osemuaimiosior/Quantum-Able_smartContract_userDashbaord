require('dotenv').config();
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const etf = require('../dbConfig/model/etfModel');

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
    var data = JSON.stringify(value);
    await fs.appendFile(path.join(__dirname, '..','db','etf.json'), `Price: ${data} Date: ${date}\n`);
    const rs = fs.creatReadStream(path.join(__dirname, '..','dbConfig','etf.json'), { encoding: 'utf8'});

    rs.on('data', async (dataChunk) => {
      /*const newUser = await etf.create({
        price: ,
        Date: 
    });*/

    console.log(dataChunk);
    });
  } catch (error) {
      console.error(error);
  }
};
  module.exports = getData;