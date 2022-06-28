import React from 'react';
import { Typography } from '@mui/material';
import Colors from '../components/Colors/Colors';


function FaceRoute () {
  return (
    <div className='container'>
      <div>
        <Typography variant="h3" align='center'>The Colors pie example</Typography>
        <p className='description'>
          D3 pie chart displaying 30 color of the named ones in CSS
          using pie and arc functions, and using chroma-js to determine the color
          of the color name
        </p>
      </div>
      <Colors />
    </div>
  );
}

export default FaceRoute;