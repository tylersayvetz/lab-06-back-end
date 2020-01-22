DROP TABLE IF EXISTS city_explorer_locations;
drop table if exists events;

CREATE TABLE city_explorer_locations(
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(30),
  formatted_query VARCHAR(50),
  latitude VARCHAR(12),
  longitude VARCHAR(12)
);

CREATE TABLE events(
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(30),
  event_date VARCHAR(30),
  link VARCHAR(255),
  name VARCHAR(50),
  summary VARCHAR(255)
);

INSERT INTO city_explorer_locations(search_query) VALUES ('Proof');
INSERT INTO events(name) VALUES ('Tyler Proof');

