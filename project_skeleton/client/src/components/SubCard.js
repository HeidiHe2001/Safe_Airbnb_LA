import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const NeighborCard = ({ AREA_NAME, SUBAREA_NAME, AREA }) => (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        {AREA_NAME}
        {SUBAREA_NAME && <>{bull}{SUBAREA_NAME}</>}
      </Typography>
      <Typography sx={{ mb: -2 }} color="text.secondary">
        Area Number: {AREA}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" href={`/areas_statistics/${AREA}`}>Find detailed crime data of {AREA_NAME}</Button>
    </CardActions>
  </React.Fragment>
);

export default NeighborCard;
