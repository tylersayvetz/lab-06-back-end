'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001; 


//configure express
app.use(cors());

//constructor function
const Location = function(city) {
  //get the data
  try { 
  const geoData = require('./data/geo.json')[0]; 
  // build the object
  this.search_query = city;
  this.formatted_location = geoData.display_name;
  this.lattitude = geoData.lat;
  this.longitude = geoData.lon;
  console.log(this)
  }
  catch (err) {
    console.log(error);
  }

  
}




/* {
  search_query: 'Lynwood'
  formatted_query: etc etc...'
}}
*/



//routes
app.get('/', (req, res) => {
  // console.log(req.query);
  // console.log(req.params); 
  console.log('Im alive');
  res.status(200).send('Server is alive');
})

app.get('/location', (req,res) => {
  console.log('hi!');
  const reqCity = req.query.city;
  const responseObj = new Location(reqCity);
  console.log("in route: ",responseObj);
  res.status(200).send(responseObj);

})

app.get('*',(req,res) => {
  res.status(404).send('that route cannot be found');
})

//configure port
app.listen(PORT, () => {console.log(`Your server is listening on ${PORT}`)});
