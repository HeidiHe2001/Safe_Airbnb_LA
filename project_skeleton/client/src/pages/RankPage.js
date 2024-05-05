import React, { useEffect, useState } from 'react';
import { Container, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const config = require('../config.json');

export default function Rank() {
    const [rankData, setRankData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Fetch ranking data from the /rank endpoint
        fetch(`http://${config.server_host}:${config.server_port}/rank`)
            .then(response => response.json())
            .then(data => {setRankData(data);
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <h2 style={{ marginBottom: "20px" }}>Neighborhood Rankings</h2>
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
                    {rankData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.neighborhood}
                            </TableCell>
                            <TableCell align="right">{row.crime_count}</TableCell>
                            <TableCell align="right">{row.severe_crime_count}</TableCell>
                            <TableCell align="right">{row.avg_rating.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.crime_rank}</TableCell>
                            <TableCell align="right">{row.rating_rank}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
                <Button onClick={() => setPage(page + 1)} style={{ marginLeft: "10px" }}>Next</Button>
            </div>
        </Container>
    );

}