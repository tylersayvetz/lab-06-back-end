lab-07
**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

Provide a way for people to type in a location name and receive a number of up-t0-the-minute details about weather, yelp, events, and have a nice map to give them a visual of where they are.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
Someone seeking to replicate this API should :
1. Get api keys for yelp, locationIQ, eventful, darksky, and movieDB.com
2. They should be familiar with Express server building and be able to deploy a server on Heroku.
3. They should use dependencies for express, dotenv, superagent, and CORS (not necessary).
4. They should build out a simple express server that has GET routes for /weather, /location ,/yelp, /movies , and /events
5. They should find a suitable pre-made front end  to display their data :)
## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->


## Change Log


### Make api calls to TMDb


### Integrate PostGres DB caching of searched locations.
When a user seraches for a city, that city will be cached in the DB to save an fucture duplicate API call. Works as long as person spells the city the same each time. There may be dupplicate db entries for misspelled citis. Case insensitive. 
Thank you to locationIQ for their willingness to let me use their location information!.


Continuing to catch up on lab-06. Stopped after the bad-query-handler-step (#4 on Trello) and continued to lab-07 and working with live APIs.

Current state of project is not deployed to Heroku. LocalHost is proving to be more than adequate for testing and the project is sufficiently linear to work in one working branch. Will merge with master and depoy to Heroku before 2pm 1/15.

Current available routes / API instructions: 

SEND: GET request to tylersayvetz.herokuapp.com/location?city=your-city-here
RECIEVE: json object {
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}

SEND: GET request to tylersayvetz.herokuapp.com/weather
RECIEVE: plain text array of objects

[
  {
    "forecast": "Partly cloudy until afternoon.",
    "time": "Mon Jan 01 2001"
  },
  {
    "forecast": "Mostly cloudy in the morning.",
    "time": "Tue Jan 02 2001"
  },
  ...
]

Lab 8 estimates: 

Number and name of feature: _____Movie db query___________

Estimate of time needed to complete: _30mins_

Start time: _11

Finish time: __1130__

Actual time needed to complete: _____







Lab 7 estimates:


Number and name of feature: integrate geolocation API and cache searched locations.

Estimate of time needed to complete: 1hour

Start time: 1145

Finish time: 1245

Actual time needed to complete: 1250


Number and name of feature: use the lat/long from the location request to gather weather information from that location using Darksky API.

Estimate of time needed to complete: 1hour

Start time: 1245

Finish time: 1345

Actual time needed to complete: 1324





Will be out of time by then.



_----------------------------------------------------------------------------------------------------------------------------------------




lab-06
Current status: 
initial setup complete. Collaborators added. 

Dependencies:
CORS
Express
dotenv

Time Estimates:

Number and name of feature: _____get server deployed on heroku - master branch_____________

Estimate of time needed to complete: _30 min____

Start time: _1030____

Finish time: _11____

Actual time needed to complete: _12 min_



Number and name of feature: ________figure out how to interact with data files_______________

Estimate of time needed to complete: __1-hour___

Start time: _11___

Finish time: __12___

Actual time needed to complete: _____




Number and name of feature: _getting city explorer to talk to server. Figuring out the front-end/back-end contract____

Estimate of time needed to complete: __1-hour___

Start time: __12 ___

Finish time: __1___

Actual time needed to complete: _____
