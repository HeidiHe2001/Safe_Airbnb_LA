import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>AREA</TableCell>
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
                <TableCell>{item.total_incidents}</TableCell>
                <TableCell>{item.unresolved_incident_rate}</TableCell>
                <TableCell>{item.avg_price}</TableCell>
                <TableCell>{item.total_listings}</TableCell>
                <TableCell>{item.total_reviews}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AreaStatisticPage;
