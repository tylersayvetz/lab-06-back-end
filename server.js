'use strict'
//express library is my server
const express = require('express');
const pg = require('pg');
const app = express();
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();


//DB config
const client = new pg.Client(process.env.DB_URL);
client.on('error', err => { throw err });
client.connect()
  .then(() => {
    //if DB connects, then start server and listen.
    app.listen(PORT, () => { console.log(`Your server is listening on ${PORT}`) });
  })
  .catch((error) => console.log("DB Failed to start.. ", error));

//configure express
const PORT = process.env.PORT || 3001;
app.use(cors());


// //cached Geocoding locations 
const cachedLocations = [];


//----------Functions and const area ----------
const send500 = (req, res) => {
  res.status(500).json({
    status: 500,
    responseText: `Sorry, something went wrong. Check your search. Error Code: ${req.query.error}`
  })
}

//constructor functions
const Location = function (city) {
  this.search_query = city.display_name.split(',')[0];
  this.formatted_query = city.display_name;
  this.latitude = city.lat;
  this.longitude = city.lon;
}

const Weather = function (data) {
  this.weather = data.daily.data.map(time => {
    return {
      forecast: time.summary,
      time: new Date(time.time * 1000).toDateString()
    }
  })
}

const Events = function (data) {
  this.events = data.map(event => {
    return {
      link: event.url,
      name: event.title,
      event_date: event.start_time,
      summary: event.description
    }
  })
}

const Movies = function (data) {
  this.movies = data.map(movie => {
    return {
      title: movie.original_title,
      overview: movie.overview,
      average_votes: movie.vote_average,
      total_votes: movie.vote_count,
      image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      popularity: movie.popularity,
      released_on: movie.release_date
    }
  })
}
//I need a query builder.... wtf mate. (is that called an ORM?)
// const DBSelectEvent = (selection) => {
//   return  new Promise((resolve, reject) => {
//     const query = 'SELECT * FROM events WHERE '
//   })
// }

const DBSelect = (search_Query, table) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + table + ' WHERE search_query = $1;';
    const values = [search_Query];
    //chose callback, here, for handling the outcome.
    client.query(query, values)
      .then(results => {
        console.log('DB "select" successful');
        if (results.rows.length > 0) {
          console.log('DB found one or more rows that matched the query')
          resolve(results.rows);
        } else {
          console.log('didnt find an row for that query')
          resolve(null)
        }
      })
      .catch(error => {
        console.log('DB "select" method unsuccessful', error)
      })
  })
}

const DBInsertLocations = (search_query, formatted_query, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO city_explorer_locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
    const values = [search_query.toLowerCase(), formatted_query, latitude, longitude];
    client.query(query, values)
      .then(results => {
        console.log('DB "insert" successful, city cached');
        resolve();
      })
      .catch(error => console.log('DB "insert" method unsuccessful', error));
  })
}

const DBInsertEvent = (search_query, event_date, link, name, summary) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO events (search_query, event_date, link, name, summary) VALUES ($1, $2, $3, $4, $5);';
    const values = [search_query.toLowerCase(), event_date, link, name, summary];
    client.query(query, values)
      .then((results) => {
        console.log('DB "insert" worked')
      })
    
  })
}

//----------routes----------
app.get('/', (req, res) => {
  console.log('Im alive');
  res.status(200).send('Server is alive');
})

app.get('/location', (req, res, ) => {
  console.log('hi!');
  const reqCity = req.query.city.toLowerCase();
  let responseSent = false;

  DBSelect(reqCity, 'city_explorer_locations')
    .then(results => {
      if (results) {
        res.status(200).json(results[0]);
        responseSent = true;
      } else {
        console.log('DB didnt find anything in cache..hitting API..');
        return superagent.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_IQ}&q=${reqCity}&format=json`)
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then(results => {
      //then construct a new Location with the results.
      //TODO: this is a terrible solution... 
      if (!responseSent) {
        const responseObj = new Location(results.body[0]);
        //insert new data into DB
        DBInsertLocations(responseObj.search_query, responseObj.formatted_query, responseObj.latitude, responseObj.longitude)
          .then(() => console.log('city inserted into DB'))
          .catch(error => console.log('There was an error inserting data into DB', error))
        res.status(200).json(responseObj);
      }
    })
    .catch(error => {
      console.log('error getting data from API', error);
    })

  app.get('/weather', (req, res) => {
    superagent.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY}/${req.query.latitude},${req.query.longitude}`)
      .then((results) => {
        const responseObj = new Weather(results.body);
        res.status(200).json(responseObj.weather);
      })
  })

  app.get('/events', (req, res) => {
    let responseSent = false;
    DBSelect(req.query.search_query, 'events')
      .then((results) => {
        if (results) {
          res.status(200).json(results);
          responseSent = true;
        } else {
          return superagent.get(`http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL}&location=${req.query.search_query}&sort_order=date&date=Future&page_size=30&page_number=1`)
        }
      })
      .then((results) => {
        if (!responseSent) {
          const parsed = JSON.parse(results.text).events;
          if (!parsed) {
            send500(req, res);
          } else {
            const responseObj = new Events(parsed.event.slice(0, 20));
            responseObj.events.forEach(event => {
              let {event_date, link, name, summary} = event;
              if (summary) {
                summary = summary.slice(0,250);
              } else {
                summary = 'no summary';
              }
              DBInsertEvent(req.query.search_query, event_date, link, name, summary.slice(0,250));
            })
            // DBInsertEvent()
            res.status(200).json(responseObj.events);
          }
        }
      })
      .catch(error => { console.log('error with selecting events', error) })


      .catch(error => {
        console.log(error);
      })
    })
  })

app.get('/movies', (req, res) => {
  superagent.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${req.query.search_query}&page=1&include_adult=false&region=US`)
    .then(results => {
      const parsed = JSON.parse(results.text);
      const responseObj = new Movies(parsed.results);
      res.status(200).json(responseObj.movies);
    })
    .catch(error => console.log(error))
})

app.get('/yelp', (req, res) => {

})