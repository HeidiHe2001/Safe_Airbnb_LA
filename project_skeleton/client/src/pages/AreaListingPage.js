import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
import LazyTable from '../components/LazyTable';
import { DataGrid } from '@mui/x-data-grid';
const config = require('../config.json');


export default function AreaListingPage() {
  const { areaname } = useParams();
  const [listData, setListData] = useState([]);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Area:", areaname);
    setLoading(true); // Set loading state before fetch
    const url = `http://${config.server_host}:${config.server_port}/airbnb_list/${areaname}`;
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        setListData(resJson);
        setLoading(false); // Set loading state after successful fetch
      })
      .catch(error => {
        console.error('Failed to fetch:', error);
        setError(error); // Set error state if fetch fails
        setLoading(false); // Set loading state after fetch error
      });
  }, [areaname]);

  const abnbColumns = [
    {
      field: 'ID',
      headerName: 'Airbnb ID',
      renderCell: (row) => <Link onClick={() => setSelectedListingId(row.ID)}>{row.ID}</Link> 
    },
    {
      field: 'AIRBNB_NAME',
      headerName: 'Airbnb Name'
    },
    {
      field: 'NEIGHBORHOOD',
      headerName: 'Neighborhood'
    },
    {
      field: 'ROOM_TYPE',
      headerName: 'Room Type'
    },
    {
      field: 'STAR',
      headerName: 'Star',
      renderCell: (row) => <span>{row.STAR ? row.STAR : 'N/A'} </span>
    },
    {
      field: 'PRICE',
      headerName: 'Price',
      renderCell: (row) => <span>${parseFloat(row.PRICE).toFixed(2)}</span>
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      {selectedListingId && <ListingCard Id={selectedListingId} handleClose={() => setSelectedListingId(null)} />}
      <h2>All Listings in {areaname}</h2>
      <LazyTable
        route={`http://${config.server_host}:${config.server_port}/airbnb_list/${areaname}`}
        data={listData}
        columns={abnbColumns}
        defaultPageSize={15} 
        rowsPerPageOptions={[10, 15, 20]}
      />
    </Container>
  );
}
