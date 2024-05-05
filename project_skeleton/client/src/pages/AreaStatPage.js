import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

const AreaStatisticPage = () => {
  const { area_id } = useParams();
  const [areaData, setAreaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/areas_statistics`)
      .then(response => response.json())
      .then(data => {
        setAreaData(data);
        filterData(area_id, data); // Filter data based on area_id
      })
      .catch(error => console.error('Error fetching area statistics:', error));
  }, [area_id]); // Trigger useEffect when area_id changes

  const filterData = (id, data) => {
    if (id) {
      const filtered = data.filter(item => item.AREA === parseInt(id));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <Container>
      <h1>Area Statistics</h1>
            <h4><Link component={NavLink} to="/areas_statistics" underline="none">
                Check All Area Statistics HERE
            </Link></h4>
            <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Area ID</TableCell>
              <TableCell>Area Name</TableCell>
              <TableCell>Total Incidents</TableCell>
              <TableCell>Unresolved Incident Rate</TableCell>
              <TableCell>Average Price</TableCell>
              <TableCell>Total Listings</TableCell>
              <TableCell>Total Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.AREA}</TableCell>
                <TableCell>{item.AREANAME}</TableCell>
                <TableCell>{item.total_incidents.toLocaleString()}</TableCell>
                <TableCell><span>{parseFloat((item.unresolved_incident_rate * 100).toFixed(3))}%</span></TableCell>
                <TableCell><span>${parseFloat(item.avg_price).toFixed(2)}</span></TableCell>
                <TableCell>{item.total_listings.toLocaleString()}</TableCell>
                <TableCell>{item.total_reviews.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AreaStatisticPage;
