import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LazyTable from '../components/LazyTable';
const config = require('../config.json');

export default function NeighborhoodPage() {
  const [neighborhood, setNeighborhood] = useState([]);

  useEffect(() => {
    fetch(`http://${config.client_host}:${config.client_port}/neighborhood`)
      .then(res => res.json())
      .then(resJson => setNeighborhood(resJson));
  }, []);
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', // Ensure the container takes up the full height
    },
  };

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
    <>
    <iframe
      src="https://www.google.com/maps/d/embed?mid=1HwsLepsrnWEI1Hxi-ivdp1WSjHI&hl=en&ehbc=2E312F"
      width="1280"
      height="480"
      title="Google Map"
      style={{ display: 'block', margin: 'auto' }} // Center the iframe horizontally
    ></iframe>
        <h3>Most Listings Neighborhoods: Click the link to see detailed listings </h3>
        <LazyTable
          route={`http://${config.server_host}:${config.server_port}/neighborhood`}
          columns={neighborListColumns}
          defaultPageSize={10}
          rowsPerPageOptions={[10, 20]}
        />

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
