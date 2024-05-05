import React, { useEffect, useState } from 'react';
import { Container, Divider, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function Rank() {
    const [rankData, setRankData] = useState([]);

    useEffect(() => {
        // Fetch ranking data from the /rank endpoint
        fetch(`http://${config.server_host}:${config.server_port}/rank`)
            .then(response => response.json())
            .then(data => {setRankData(data);
            });
    }, []);
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Rank Details
            </Typography>
            <Divider />
            <Link component={NavLink} to="/" underline="none">
                Go Back Homepage
            </Link>
            {rankData.length > 0 ? (
                <ul>
                    {rankData.map((item, index) => (
                        <li key={index}>{item.name} - Score: {item.score}</li>
                    ))}
                </ul>
            ) : (
                <Typography variant="h6" gutterBottom>
                    Loading...
                </Typography>
            )}
        </Container>
    );
}
