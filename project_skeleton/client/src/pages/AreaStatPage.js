import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const config = require('../config.json');

const AreaStatisticPage = () => {
  const { area_id } = useParams();
  const [areaData, setAreaData] = useState({});

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/area_statistic/${area_id}`)
      .then(res => res.json())
      .then(resJson => setAreaData(resJson[0]))
      .catch(error => console.error('Error fetching area statistic data:', error));
  }, [area_id]);

  return (
    <Container>
      <h1>Area Statistics: {areaData.AREA}</h1>
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
            <TableRow>
              <TableCell>{areaData.AREA}</TableCell>
              <TableCell>{areaData.total_incidents}</TableCell>
              <TableCell>{areaData.unresolved_incident_rate}</TableCell>
              <TableCell>{areaData.avg_price}</TableCell>
              <TableCell>{areaData.total_listings}</TableCell>
              <TableCell>{areaData.total_reviews}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AreaStatisticPage;
