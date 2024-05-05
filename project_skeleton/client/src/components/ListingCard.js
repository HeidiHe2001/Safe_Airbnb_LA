import { useEffect, useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { NavLink } from 'react-router-dom';
import SubCard from './SubCard';

const config = require('../config.json');

export default function ListingCard({ Id, handleClose }) {
  const [listingData, setListingData] = useState({});
  const [neighborData, setNeighborData] = useState({});
  const [showSubCard, setShowSubCard] = useState(false);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/listing/${Id}`)
      .then(res => res.json())
      .then(resJson => {
        setListingData(resJson);
        fetch(`http://${config.server_host}:${config.server_port}/neighbor/${resJson.NEIGHBORHOOD}`)
          .then(neighborRes => neighborRes.json())
          .then(neighborResJson => {
            console.log("Neighbor Data:", neighborResJson);  // Log the neighbor data
            setNeighborData(neighborResJson[0]);
          })
          .catch(error => console.error('Error fetching neighborhood data:', error));
      }
    );
  }, [Id]);

  const chartData = [
    { name: 'Price', value: listingData.PRICE },
    { name: 'Minimum Nights', value: listingData.MINIMUM_NIGHTS },
    { name: 'Availability (out of 365)', value: listingData.AVAILABILITY_365 }
  ];
  const handleShowSubCard = () => {
    setShowSubCard(true);
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1
      }}
    >
      <Box
        sx={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: 3,
          p: 3,
          width: '100%',
          maxWidth: '600px',
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {listingData.ID ? `Listing ID: ${listingData.ID}` : 'Listing Details'}
        </Typography>
        <Typography variant="h6" component="h2">
          Neighborhood:&nbsp;
          <Button variant="contained" onClick={handleShowSubCard} sx={{ ml: 2 }}>
            {neighborData.SUBAREA_NAME}
          </Button>
        </Typography>
        {showSubCard && (
          <SubCard
            AREA_NAME={neighborData.AREA_NAME}
            SUBAREA_NAME={neighborData.SUBAREA_NAME}
            AREA={neighborData.AREA}
            onClose={() => setShowSubCard(false)}
          />
        )}
        <Typography sx={{ mt: 2 }}>Bedroom(s): {listingData.BEDROOMS}</Typography>
        <Typography>Bed(s): {listingData.BEDS}</Typography>
        <Typography>Bath(s): {listingData.BATHS}</Typography>
        
        <div style={{ marginTop: 20, height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout='vertical'
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type='number' />
              <YAxis type='category' dataKey='name' width={100} />
              <Tooltip />
              <Bar dataKey='value' fill='#1976d2' barSize={20} 
              label={{ position: 'right', fill: '#000' }}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Button
          onClick={handleClose}
          sx={{
            mt: 4,
            bgcolor: 'secondary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'secondary.dark',
            },
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
