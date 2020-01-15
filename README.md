lab-07
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
