import React from 'react';
import { Typography } from '@mui/material';
import Face from '../components/Face/Face';

function FaceRoute () {
  return (
    <div className='container'>
      <Typography variant="h4">The face SVG example</Typography>
      <Face/>
    </div>
  );
}

export default FaceRoute;