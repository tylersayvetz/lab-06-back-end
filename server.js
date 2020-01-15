'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const PORT = process.env.PORT || 3001;


//configure express
app.use(cors());

//cached Geocoding locations
const cachedLocations = [];


//----------Functions and const area ----------
const findCity = (req, res, next) => {
  //does the searched city exist? if not redirect to /error
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
      res.status(500).json({
        status: 500,
        responseText: `Sorry, something went wrong. Check your search. Error Code: ${req.query.error}`
      })
    }
  } catch (error) {
    console.log(error);
  }
}

//constructor functions
const Location = function (city) {
  this.search_query = city.display_name.split(',')[0];
  this.formatted_query = city.display_name;
  this.latitude = city.lat;
  this.longitude = city.lon;
  console.log(this);
}

const Weather = function (data) {
  this.weather = data.daily.data.map(time => {
    return {
      forecast: time.summary,
      time: new Date(time.time * 1000).toDateString()
    }
  })
}

//----------routes----------
app.get('/', (req, res) => {
  // console.log(req.query);
  // console.log(req.params); 
  console.log('Im alive');
  res.status(200).send('Server is alive');
})

app.get('/location', (req, res) => {
  console.log('hi!');
  const reqCity = req.query.city;

  //look for a cached location that matches the query city.
  const cachedObj = cachedLocations.find(location => {
    return location.search_query.toLowerCase() === req.query.city ? location : undefined;
  })
  if (cachedObj) {
    res.status(200).json(cachedObj);
  } else {
    //otherwise, make a superAgent request and get that location.
    superagent.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_IQ}&q=${reqCity}&format=json`)
      .then((results) => {
        //then construct a new Location with the results.
        const responseObj = new Location(results.body[0]);
        // cache the resultant object.
        cachedLocations.push(responseObj);
        // send the obj.
        console.log(responseObj);
        res.status(200).json(responseObj);
      })
      .catch((error) => {
        console.log('Promise failed');
      })
  }

})

app.get('/weather', (req, res) => {
  superagent.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY}/${req.query.latitude},${req.query.longitude}`)
    .then((results) => {
      console.log(results);
      const responseObj = new Weather(results.body);
      res.status(200).json(responseObj.weather);
    })
})

app.get('/yelp', (req, res) => {

})

app.get('*', (req, res) => {
  res.status(404).send('that route cannot be found');
})


// listen
app.listen(PORT, () => { console.log(`Your server is listening on ${PORT}`) });
