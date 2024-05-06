import React, { useEffect, useState } from 'react';
import { Container, Divider, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import SubCard from '../components/SubCard';
const config = require('../config.json');

export default function Rank() {
    const [rankData, setRankData] = useState([]);
    const [showSubCard, setShowSubCard] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;  // Default page size

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/rank`)
            .then(response => response.json())
            .then(data => {
                setRankData(data);
            })
            .catch(error => console.error('Failed to fetch rank data:', error));
    }, []);

    // Calculate the current page's slice of data
    const currentData = rankData.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Container maxWidth="lg">
            <h2 style={{ marginBottom: "20px" }}>Neighborhood Rankings</h2>
            <h4>Check our rank for each neighborhood by crime count and severance level, 
                with the average rating of Airbnb listings in each neighborhood. </h4>
            <Divider style={{ marginBottom: "20px" }} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Neighborhood</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Crime Count</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Severe Crime Count</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Average Rating</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Crime Rank</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Rating Rank</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row"><SubCard
                                AREA_NAME={row.areaname}
                                SUBAREA_NAME={row.neighborhood}
                                AREA={row.area_id}
                                onClose={() => setShowSubCard(false)}
                                />
                            </TableCell>
                            <TableCell align="right">{row.crime_count}</TableCell>
                            <TableCell align="right">{row.severe_crime_count}</TableCell>
                            <TableCell align="right">
                                {row.avg_rating != null ? row.avg_rating.toFixed(2) : 'N/A'}
                            </TableCell>
                            <TableCell align="right">{row.crime_rank}</TableCell>
                            <TableCell align="right">{row.rating_rank}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Previous</Button>
                <Button onClick={() => setPage(page + 1)} disabled={page * pageSize >= rankData.length} style={{ marginLeft: "10px" }}>Next</Button>
            </div>
        </Container>
    );
}
