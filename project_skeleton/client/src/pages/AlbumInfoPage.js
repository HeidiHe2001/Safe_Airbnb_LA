import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
import LazyTable from '../components/LazyTable';
const config = require('../config.json');


export default function AlbumInfoPage() {
  const { neighborhood } = useParams();

  const [listData, setListData] = useState([{}]); // default should actually just be [], but empty object element added to avoid error in template code
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/airbnb_list/${neighborhood}`)
      .then(res => res.json())
      .then(resJson => setListData(resJson));
  }, [neighborhood]);



  const abnbColumns = [
    {
      field: 'AIRBNB_NAME',
      headerName: 'Airbnb Title',
      renderCell: (row) => <Link onClick={() => setSelectedListingId(row.ID)}>{row.AIRBNB_NAME}</Link>
      // A Link component is used just for formatting purposes
    },
    {
      field: 'NEIGHBORHOOD',
      headerName: 'Neighborhood',
      renderCell: (row) => <NavLink to={`/neighbor/${row.neighborhood}`}>{row.area_name}</NavLink>
    },
    {
      field: 'STAR',
      headerName: 'Star'
    },
  ];

  return (
    <LazyTable
      route={`http://${config.server_host}:${config.server_port}/airbnb_list/`}
      columns={abnbColumns}
      defaultPageSize={10}
      rowsPerPageOptions={[10, 20]}
    />
  );
}

// <Container>
//       {selectedListingId && <ListingCard Id={selectedListingId} handleClose={() => setSelectedListingId(null)} />}
//       <Stack direction='row' justify='center'>
//       </Stack>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell key='id'>id</TableCell>
//               <TableCell key='host_name'>host_name</TableCell>
//               <TableCell key='room_type'>room_type</TableCell>
//               <TableCell key='price'>price</TableCell>
//               <TableCell key='number_of_reviews'>number_of_reviews</TableCell>
//               <TableCell key='airbnb_name'>airbnb_name</TableCell>
//               <TableCell key='star'>star</TableCell>
//               <TableCell key='bedrooms'>bedrooms</TableCell>
//               <TableCell key='beds'>beds</TableCell>
//               <TableCell key='baths'>baths</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//               // TODO (TASK 23): render the table content by mapping the songData array to <TableRow> elements
//               // Hint: the skeleton code for the very first row is provided for you. Fill out the missing information and then use a map function to render the rest of the rows.
//               // Hint: it may be useful to refer back to LazyTable.js
//               <TableRow key={listData[0].id}>
//                 <TableCell key='#'>{listData[0].id}</TableCell>
//                 <TableCell key='Title'>
//                   <Link onClick={() => setSelectedListingId(listData[0].id)}>
//                     Replace me
//                   </Link>
//                 </TableCell>
//                 <TableCell key='Plays'>Replace me</TableCell>
//                 <TableCell key='Duration'>Replace me (use the formatDuration helper function, see ListingCard.js for an example)</TableCell>
//               </TableRow>
//             }
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
