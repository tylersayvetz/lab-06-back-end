DROP TABLE IF EXISTS city_explorer_locations;

CREATE TABLE city_explorer_locations(
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(30),
  formatted_query VARCHAR(50),
  latitude VARCHAR(12),
  longitude VARCHAR(12)
);

INSERT INTO city_explorer_locations(search_query) VALUES ('Proof');

