const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

// Route 1: GET /authors/:type
const authors = async function(req, res) {
  const names = ['Jingle Wang', 'Ziqi He', 'Lingpei Luo', 'Guangqiuse Hu'];
  const gitnames = ['gillianwang0325', 'HeidiHe2001', 'JLmm123', 'violahu930']
  if (req.params.type === 'names') {
    res.json({ name: names });
  } else if (req.params.type === 'gitnames') {
    res.json({ pennkey: gitnames });
  } else {
    res.status(400).json({});
  }
}

// Route 2: GET /random
// Random recommend one Airbnb listing
const random = async function(req, res) {
  connection.query(`
    SELECT *
    FROM Airbnb
    ORDER BY RAND()
    LIMIT 1
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({
        song_id: data[0].song_id,
        title: data[0].title
      });
    }
  });
}

/********************************
 * BASIC INFO ROUTES *
 ********************************/

// Route 3: GET /listing/:id
const listing = async function(req, res) {
  // given an listing id of Airbnb table, returns all information about the id
  connection.query(`
  SELECT * FROM CRIME_AIRBNB.Airbnb
  WHERE CRIME_AIRBNB.Airbnb.id = '${req.params.id}';
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data[0]);
    }
  });
}

// Route 4: GET /neighborhood
const neighborhood = async function(req, res) {
  // returns all neighborhood with the most Airbnb listings DESC
  connection.query(`
  SELECT neighborhood, COUNT(*) AS listing_count
  FROM CRIME_AIRBNB.Airbnb a
  GROUP BY a.neighborhood
  ORDER BY COUNT(*) DESC;
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 5: GET /area_crime_count
// sort area with the lowest crime number
const area_crime_count = async function(req, res) {
  // returns all area with the total crime number DESC
  connection.query(`
  WITH crime_counts AS (
    SELECT AREA AS area_name, COUNT(*) AS crime_count
    FROM CrimeData
    GROUP BY AREA)
  SELECT area_name, crime_count
  FROM crime_counts
  ORDER BY crime_count ASC;
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}


// Route 6: GET /airbnb_list/:area
const airbnb_list = async function(req, res) {
  // Given area, retrieve all airbnb in that area with info: airbnb_name, neighborhood, room_type, price, minimum_nights
  const area = req.params.area;
  connection.query(`
  SELECT id
  FROM CRIME_AIRBNB.Airbnb a
  JOIN CRIME_AIRBNB.Areas ON CRIME_AIRBNB.Areas.SUBAREA_NAME= a.neighbourhood
  WHERE CRIME_AIRBNB.Areas.AREA = '${area}';
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

/************************
 * ADVANCED INFO ROUTES *
 ************************/

// Route 7: GET /high_price_low_crime
const high_price_low_crime = async function(req, res) {
  const page = req.query.page;
  // set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ? req.query.page_size : 10;

  let taskQuery = `
  WITH avg_price_per_neighbourhood AS (
    SELECT CRIME_AIRBNB.Areas.AREA AS area, CRIME_AIRBNB.Areas.AREA_NAME AS area_name, AVG(air.price) AS avg_price
    FROM CRIME_AIRBNB.Airbnb as air
    LEFT JOIN CRIME_AIRBNB.Areas ON air.neighborhood = CRIME_AIRBNB.Areas.SUBAREA_NAME
    GROUP BY CRIME_AIRBNB.Areas.AREA),
  crime_summary AS (
    SELECT AREA, COUNT(*) AS total_crimes
    FROM CRIME_AIRBNB.CrimeData
    GROUP BY AREA)
  SELECT apn.area, apn.area_name, apn.avg_price, cs.total_crimes
  FROM avg_price_per_neighbourhood apn
  LEFT JOIN crime_summary cs ON apn.area = cs.AREA
  WHERE apn.avg_price > (SELECT AVG(price) FROM CRIME_AIRBNB.Airbnb)
  AND cs.total_crimes < (SELECT AVG(total_crimes) FROM crime_summary)
  ORDER BY apn.avg_price DESC
  `;
  if (!page) {
    taskQuery  = taskQuery
  } else {
    const offset = (page - 1) * pageSize;
    taskQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;
  }

  connection.query(taskQuery, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 8: GET /areas_statistics
const areas_statistics = async function(req, res) {
  // retrieve total_incidents in all areaa, unresolved_incident_rate 
  // in areas, avg_price of Airbnbs, total_listings of Airbnbs, total_reviews of 
  // Airbnbs in this area
  connection.query(`
  WITH crime_summary AS (
    SELECT AREA, COUNT(*) AS total_incidents,
    AVG(CASE WHEN 'Status' = 'IC' THEN 1 ELSE 0 END) AS unresolved_incident_rate
    FROM CRIME_AIRBNB.CrimeData
    WHERE YEAR('Date_Occ') = 2023
    GROUP BY AREA),
    
  airbnb_summary AS (
    SELECT CRIME_AIRBNB.Areas.AREA AS AREA, AVG(CRIME_AIRBNB.Airbnb.price) AS avg_price, COUNT(*) AS total_listings
    FROM CRIME_AIRBNB.Airbnb JOIN CRIME_AIRBNB.Areas ON CRIME_AIRBNB.Airbnb.neighborhood = CRIME_AIRBNB.Areas.SUBAREA_NAME
    GROUP BY CRIME_AIRBNB.Areas.AREA),
  popular_area AS (
    SELECT area.AREA AS AREA, SUM(airbnb.NUMBER_OF_REVIEWS) AS total_reviews
    FROM CRIME_AIRBNB.Airbnb airbnb JOIN CRIME_AIRBNB.Areas area ON airbnb.neighborhood = area.SUBAREA_NAME
    GROUP BY area.AREA
    )
    
  SELECT cs.AREA, cs.total_incidents, cs.unresolved_incident_rate, asum.avg_price, asum.total_listings, pa.total_reviews
  FROM crime_summary cs
  LEFT JOIN airbnb_summary asum ON cs.AREA = asum.AREA
  LEFT JOIN popular_area pa ON cs.AREA = pa.AREA
  ORDER BY cs.total_incidents DESC;
  `, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 9: GET /search_listing
const search_listing = async function(req, res) {
  // return all Airbnb listing that match the given search query with parameters 
  // defaulted to those specified in API spec ordered by id (ascending)
  const title = req.query.title ?? '';
  const starLow = req.query.star_low ?? 0;
  const starHigh = req.query.star_high ?? 5;
  const crimeRateLow = req.query.crime_rate_low ?? 0;
  const crimeRateHigh = req.query.crime_rate_high ?? 100;
  const bedroomLow = req.query.bedroom_low ?? 0;
  const bedroomHigh = req.query.bedroom_high ?? 10;
  const bathroomLow = req.query.bathroom_low ?? 0;
  const bathroomHigh = req.query.bathroom_high ?? 10;
  const minNightLow = req.query.min_night_low ?? 0;
  const minNightHigh = req.query.min_night_high ?? 50;

  let taskQuery = `
  WITH crime_neighborhood_summary AS (
    SELECT CRIME_AIRBNB.Areas.AREA AS area, CRIME_AIRBNB.Areas.SUBAREA_NAME AS neighborhood, COUNT(*) AS total_crimes
  FROM CRIME_AIRBNB.CrimeData crime
  JOIN CRIME_AIRBNB.Areas ON CRIME_AIRBNB.Areas. AREA = crime.AREA
  GROUP BY CRIME_AIRBNB.Areas.AREA)

  SELECT id
  FROM CRIME_AIRBNB.Airbnb a
  JOIN crime_neighborhood_summary cns ON a.neighborhood = cns.neighborhood
  WHERE cns.total_crimes > ${crimeRateLow} AND cns.total_crimes < ${crimeRateHigh}
  AND a.star > ${starLow} AND a.star < ${starHigh}
  AND a.bedroom > ${bedroomLow} AND a.bedroom < ${bedroomHigh}
  AND a.bathroom >= ${bathroomLow} AND a.bathroom <= ${bathroomHigh}
  AND a.min_nights >= ${minNightLow} AND a.min_nights <= ${minNightHigh}
  `;
  if (title) {
    taskQuery += ` AND title LIKE '%${title}%'`;
  }
  taskQuery += ` ORDER BY id ASC`;

  connection.query(taskQuery, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 10: GET /high_demand_low_crime
const high_demand_low_crime = async function(req, res) {
  // Identifying High-Demand Airbnb Listings in Areas with Low Crime Rates
  const page = req.query.page;
  // set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ? req.query.page_size : 10;

  let taskQuery = `
  WITH crime_summary AS (
    SELECT AREA, COUNT(*) AS total_crimes
    FROM CRIME_AIRBNB.CrimeData
    GROUP BY AREA),
  low_crime_areas AS (
    SELECT AREA
    FROM CRIME_AIRBNB.Areas
    GROUP BY AREA
    HAVING COUNT(*) < (SELECT AVG(total_crimes) FROM crime_summary))
  SELECT airbnb_name, price
  FROM CRIME_AIRBNB.Airbnb
  WHERE neighborhood IN (
  SELECT CRIME_AIRBNB.Areas.SUBAREA_NAME NAME FROM low_crime_areas la
  LEFT JOIN CRIME_AIRBNB.Areas ON la.AREA = CRIME_AIRBNB.Areas.Area)
  ORDER BY number_of_reviews DESC
  `;
  if (!page) {
    taskQuery  = taskQuery
  } else {
    const offset = (page - 1) * pageSize;
    taskQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;
  }

  connection.query(taskQuery, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 11: GET /high_crime_listing
const high_crime_listing = async function(req, res) {
  // Identifying Airbnb Listings Near High Crime Density Areas
  const page = req.query.page;
  // set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ? req.query.page_size : 10;

  let taskQuery = `
  WITH crime_density_per_area AS (
    SELECT AREA, COUNT(*) AS crime_density
    FROM CRIME_AIRBNB.CrimeData
    GROUP BY AREA),
    avg_density_per_neighborhood AS(
    SELECT AVG(crime_density) FROM crime_density_per_area
    )
    
  SELECT airbnb_data.airbnb_name, airbnb_data.price, airbnb_data.area, crime_density
  FROM (SELECT
  a.airbnb_name AS airbnb_name, a.price AS price, R2.AREA AS area
  FROM CRIME_AIRBNB.Airbnb a
  LEFT JOIN CRIME_AIRBNB.Areas R2 ON a.neighborhood = R2.SUBAREA_NAME) airbnb_data
  LEFT JOIN crime_density_per_area cd ON airbnb_data.area = cd.AREA
  ORDER BY cd.crime_density DESC
  `;
  if (!page) {
    taskQuery  = taskQuery
  } else {
    const offset = (page - 1) * pageSize;
    taskQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;
  }

  connection.query(taskQuery, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

// Route 12: GET /rank
const rank = async function(req, res) {
  // Rank each neighborhood by crime count and severance level, and also calculate 
  // the average rating of Airbnb listings in each neighborhood
  const page = req.query.page;
  // set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ? req.query.page_size : 10;

  let taskQuery = `
  WITH CrimeCounts AS (
    SELECT area.SUBAREA_NAME AS neighborhood, COUNT(*) AS crime_count,
    SUM(CASE WHEN severance.Part = 1 THEN 1 ELSE 0 END) AS severe_crime_count
    FROM CRIME_AIRBNB.CrimeData crime
    JOIN CRIME_AIRBNB.Areas area ON crime.AREA = area.AREA
    JOIN CRIME_AIRBNB.Severance severance ON crime.Crm_Cd = severance.Crm_Cd
    GROUP BY area.SUBAREA_NAME),
  AverageRatings AS (
    SELECT neighborhood, AVG(star) AS avg_rating
    FROM CRIME_AIRBNB.Airbnb airbnb
    GROUP BY neighborhood)
  SELECT c.neighborhood, c.crime_count, c.severe_crime_count, a.avg_rating,
  RANK() OVER (ORDER BY c.crime_count, c.severe_crime_count) AS crime_rank,
  RANK() OVER (ORDER BY a.avg_rating DESC) AS rating_rank
  FROM CrimeCounts c JOIN AverageRatings a ON c.neighborhood = a.neighborhood
  `;
  if (!page) {
    taskQuery  = taskQuery
  } else {
    const offset = (page - 1) * pageSize;
    taskQuery += ` LIMIT ${pageSize} OFFSET ${offset}`;
  }

  connection.query(taskQuery, (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
}

module.exports = {
  authors,
  random,
  listing,
  neighborhood,
  area_crime_count,
  airbnb_list,
  high_price_low_crime,
  areas_statistics,
  search_listing,
  high_demand_low_crime,
  high_crime_listing,
  rank
}
