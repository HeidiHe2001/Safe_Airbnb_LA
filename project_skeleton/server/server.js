const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/authors/:type', routes.authors);
app.get('/random', routes.random);
app.get('/listing/:id', routes.listing);
app.get('/neighborhood', routes.neighborhood);
app.get('/area_crime_count', routes.area_crime_count);
app.get('/airbnb_list/:subarea', routes.airbnb_list);
app.get('/high_price_low_crime', routes.high_price_low_crime);
app.get('/areas_statistics', routes.areas_statistics);
app.get('/areas_statistics/:areaid', routes.areas_statistics);
app.get('/search_listing', routes.search_listing);
app.get('/high_demand_low_crime', routes.high_demand_low_crime);
app.get('/high_crime_listing', routes.high_crime_listing);
app.get('/rank', routes.rank);
app.get('/neighbor/:subname', routes.neighbor);
app.get('/area/:areaname', routes.area)
app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
