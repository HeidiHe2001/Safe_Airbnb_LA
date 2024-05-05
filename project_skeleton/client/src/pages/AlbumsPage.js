import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LazyTable from '../components/LazyTable';
const config = require('../config.json');

export default function AlbumsPage() {
  const [neighborhood, setNeighborhood] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/neighborhood`)
      .then(res => res.json())
      .then(resJson => setNeighborhood(resJson));
  }, []);

  // These formatting options leverage flexboxes, an incredibly powerful tool for formatting dynamic layouts.
  // You can learn more on MDN web docs linked below (or many other online resources)
  // https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
  const format1 = {};
  const format2 = { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' };
  const format3 = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };
  const format4 = { display: 'grid', justifyContent: 'space-evenly' };

  const neighborListColumns = [
    {
      field: 'neighborhood',
      headerName: 'Neighborhood',
      renderCell: (row) => <NavLink to={`/airbnb_list/${row.neighborhood}`}>{row.neighborhood}</NavLink>
    },
    {
      field: 'listing_count',
      headerName: 'Total Numbers of Airbnb Listings'
    },
  ];

  return (
    // TODO (TASK 22): Try out the different provided formatting options by replacing “format1”  in the Container's style property with the other provided options.
    // TODO (TASK 22): Choose the one that displays all the albums in a fluid grid.
    <>
    <iframe 
      src="https://www.google.com/maps/d/embed?mid=1HwsLepsrnWEI1Hxi-ivdp1WSjHI&hl=en&ehbc=2E312F" 
      width="1280" 
      height="480"
      title="Google Map"
      style={{ display: 'block', margin: 'auto' }} // Center the iframe horizontally
    ></iframe>
    
   
  <LazyTable
        route={`http://${config.server_host}:${config.server_port}/neighborhood`}
        columns={neighborListColumns}
        defaultPageSize={10} 
        rowsPerPageOptions={[10, 20]}/>

    {/* <Container style={format1}>
      {neighborhood.map((neighborhood) =>
        <Box
          key={neighborhood.neighborhood}
          p={3}
          m={2}
          style={{ background: '#c5cae9', borderRadius: '16px', border: '2px solid #000' }}
        >
          <img
            key={neighborhood.neighborhood}
            src={neighborhood.thumbnail_url}
            alt={`${neighborhood.neighborhood}`}
          />
          <h4><NavLink to={`/airbnb_list/${neighborhood.neighborhood}`}>{neighborhood.neighborhood}</NavLink></h4> 
        </Box>
      )}
    </Container> */}
    </>
  );
}
