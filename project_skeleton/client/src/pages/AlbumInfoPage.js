import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import ListingCard from '../components/ListingCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function AlbumInfoPage() {
  const { album_id } = useParams();

  const [songData, setSongData] = useState([{}]); // default should actually just be [], but empty object element added to avoid error in template code
  const [albumData, setAlbumData] = useState([]);

  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/album/${album_id}`)
      .then(res => res.json())
      .then(resJson => setAlbumData(resJson));

    fetch(`http://${config.server_host}:${config.server_port}/album_songs/${album_id}`)
      .then(res => res.json())
      .then(resJson => setSongData(resJson));
  }, [album_id]);

  return (
    <Container>
      {selectedSongId && <ListingCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />}
      <Stack direction='row' justify='center'>
        <img
          key={albumData.album_id}
          src={albumData.thumbnail_url}
          alt={`${albumData.title} album art`}
          style={{
            marginTop: '40px',
            marginRight: '40px',
            marginBottom: '40px'
          }}
        />
        <Stack>
          <h1 style={{ fontSize: 64 }}>{albumData.title}</h1>
          <h2>Released: {formatReleaseDate(albumData.release_date)}</h2>
        </Stack>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key='#'>#</TableCell>
              <TableCell key='Title'>Title</TableCell>
              <TableCell key='Plays'>Plays</TableCell>
              <TableCell key='Duration'>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <TableRow key={songData[0].song_id}>
                <TableCell key='#'>{songData[0].number}</TableCell>
                <TableCell key='Title'>
                  <Link onClick={() => setSelectedSongId(songData[0].song_id)}>
                    Replace me
                  </Link>
                </TableCell>
                <TableCell key='Plays'>Replace me</TableCell>
                <TableCell key='Duration'>Replace me (use the formatDuration helper function, see ListingCard.js for an example)</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}