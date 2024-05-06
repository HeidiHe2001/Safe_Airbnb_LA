import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SubCard from '../components/SubCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import LazyTable from '../components/LazyTable';
import ListingCard from '../components/ListingCard';
const config = require('../config.json');

export default function HomePage() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  const [randomRecommend, setRandomRecommend] = useState({});
  const [authors, setAuthors] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [showSubCard, setShowSubCard] = useState(false);

  useEffect(() => {
    // Fetch request to get the song of the day. Fetch runs asynchronously.
    // The .then() method is called when the fetch request is complete
    // and proceeds to convert the result to a JSON which is finally placed in state.
    fetch(`http://${config.server_host}:${config.server_port}/random`)
      .then(res => res.json())
      .then(resJson => setRandomRecommend(resJson))
      .catch(error => console.error('Failed to fetch random recommendation:', error));

    fetch(`http://${config.server_host}:${config.server_port}/authors/names`)
      .then(res => res.json())
      .then(resJson => setAuthors(resJson.names));
  }, []);

  const abnbColumns = [
    {
      field: 'airbnb_name',
      headerName: 'Airbnb',
      renderCell: (row) => 
      <Link onClick={() => setSelectedId(row.id)}>{row.airbnb_name}</Link>
    },
    {
      field: 'price',
      headerName: 'Price',
      renderCell: (row) => (
        <span>${parseFloat(row.price).toFixed(2)}</span>
      )
    },
    {
      field: 'number_of_reviews',
      headerName: 'Number of Reviews'
    },
    {
      field: 'star',
      headerName: 'Star'
    },
  ];

  const neighborColumns = [
    {
      field: 'Area',
      headerName: 'Area',
      renderCell: (row) => <SubCard
      AREA_NAME={row.area_name}
      AREA={row.area}
      onClose={() => setShowSubCard(false)}
    />
    },
    {
      field: 'avg_price',
      headerName: 'Average Airbnb Listing Price',
      renderCell: (row) => (
        <span>${parseFloat(row.avg_price).toFixed(2)}</span>
      )
    },
  ];
  
  return (
    <Container>
      {selectedId && <ListingCard Id={selectedId} handleClose={() => setSelectedId(null)} />}
      <h2>
      <FontAwesomeIcon icon={faStar} /> Check out our recommended listing of the day:&nbsp;
        {randomRecommend.airbnb_name ? (
        <Link onClick={() => setSelectedId(randomRecommend.id)}>{randomRecommend.airbnb_name}</Link>
      ) : (
      <span>Loading...</span>
  )} <FontAwesomeIcon icon={faStar} />
      </h2>
      <Divider />
      <h2>Top 3 Safest and Expensive Areas </h2>
      <LazyTable 
      route={`http://${config.server_host}:${config.server_port}/high_price_low_crime`} 
      columns={neighborColumns} 
      defaultPageSize={3} 
      rowsPerPageOptions={[1, 3]}/>
      <Divider />
      <h2>Most Popular Airbnb Listings</h2>
      {selectedId && <ListingCard Id={selectedId} handleClose={() => setSelectedId(null)} />}
      <LazyTable
        route={`http://${config.server_host}:${config.server_port}/high_demand_low_crime`}
        columns={abnbColumns}
        defaultPageSize={5} 
        rowsPerPageOptions={[5, 10]}/>
      <Divider />
      
      <p>Created by {authors} @ UPenn</p>
    </Container>
  );
};