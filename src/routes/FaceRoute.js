import React from 'react';
import { Typography } from '@mui/material';
import Face from '../components/Face/Face';
import { range } from 'd3';

function FaceRoute () {
  return (
    <div className='container'>
      <Typography variant="h4">The face SVG example</Typography>
      <div className='container-row'>
        {range(4 * 2).map(() => <Face
          size={200}
          strokeWidth={Math.random() * 10 + 6}
          eyeSize={5 + Math.random() * 15}
        />)}
      </div>
    </div>
  );
}

export default FaceRoute;