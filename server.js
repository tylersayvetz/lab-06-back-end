'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001; 

//configure port
app.listen(PORT, () => {console.log(`'Your server is listening on ${PORT}`)});

//configure express
app.use(cors());



app.get('/', (req, res) => {
  console.log(req.query);
  console.log(req.params);
  console.log('Im alive');
  res.status(200).send('Server is alive');
})

const geoData = require('./data/geo.json'); 
// console.log(geoData);


