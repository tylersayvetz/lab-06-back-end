'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;


//configure express
app.use(cors());



//verify city query
const findCity = (req, res, next) => {
  //is the city valid? if not send an error.
  const city = req.query.city;
  try {
    const rawData = require('./data/geo.json');
    const valid = rawData.find(cit => {
      const foundCity = cit.display_name.split(',');
      return (foundCity[0].toLowerCase() === city) ? city : null;
    })
    if (valid) { 
      next();
    }
    else {
      res.redirect('/error?error=not-found');
    }
  } catch (error) {
    console.log(error);
  }
  //if the city is valid, next()
  
}

//constructor functions
const Location = function (city) {
  //get the data
  try {
    const rawData = require('./data/geo.json');
    // build the object
    const geoData = rawData.find(cit => {
      const foundCity = cit.display_name.split(',');
      return (foundCity[0].toLowerCase() === city) ? city : undefined;
    })
    this.search_query = city;
    this.formatted_query = geoData.display_name;
    this.latitude = geoData.lat;
    this.longitude = geoData.lon;
    console.log(this)
  }
  catch (err) {
    console.log(error);
  }
}

const Weather = function () {
  try {
    const darkSky = require('./data/darksky.json');

    this.weather = darkSky.daily.data.map(time => {
      return {
        forecast: time.summary,
        time: new Date(time.time).toDateString()
      }
    })
  }
  catch (error) {
    console.log(error);
  }
}








/* {
  search_query: 'Lynnwood'
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

app.get('/location', findCity, (req, res) => {
  console.log('hi!');
  const reqCity = req.query.city;
  const responseObj = new Location(reqCity);
  console.log("in route: ", responseObj);
  res.status(200).send(responseObj);
 

})

app.get('/weather', (req, res) => {
  console.log('Weather route fired, query: ', req.query);
  const responseObj = new Weather();
  res.status(200).json(responseObj.weather);
})

app.get('/yelp', (req, res) => {

})

app.get('/error', (req, res) => {
  console.log();
  res.status(500).json({
    status: 500,
    responseText: "Sorry, something went wrong. Check your search."
  })
})

app.get('*', (req, res) => {
  res.status(404).send('that route cannot be found');
})

//configure port
app.listen(PORT, () => { console.log(`Your server is listening on ${PORT}`) });
