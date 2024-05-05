import React, { useEffect, useState } from 'react';
import { Container, Divider, Link, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function Rank() {
    const [rankData, setRankData] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;  // Default page size

    useEffect(() => {
        // Fetch ranking data from the /rank endpoint
        fetch(`http://${config.server_host}:${config.server_port}/rank`)
            .then(response => response.json())
            .then(data => {setRankData(data);
            });
    }, []);

return (
        <Container maxWidth="lg">
            <h2>Neighborhood Rankings</h2>
            <Divider />
            <Link component={NavLink} to="/" underline="none">
                Go back to home
            </Link>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Neighborhood</TableCell>
                        <TableCell align="right">Crime Count</TableCell>
                        <TableCell align="right">Severe Crime Count</TableCell>
                        <TableCell align="right">Average Rating</TableCell>
                        <TableCell align="right">Crime Rank</TableCell>
                        <TableCell align="right">Rating Rank</TableCell>
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
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
            <Button onClick={() => setPage(page + 1)}>Next</Button>
        </Container>
    );
}