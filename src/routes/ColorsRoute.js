import React from 'react';
import { Typography } from '@mui/material';
import Colors from '../components/Colors/Colors';
import useFetch from '../hooks/useFetch';
import { csv } from 'd3';
import HandleAsync from '../components/HandleAsync/HandleAsync';

const colorsUrl = 'https://gist.githubusercontent.com/AbanoubMagdy1/da81a2d3edf91241f4acd0c40aaf33a8/raw/dcfb5396aca1b84b9682443d9d3cd8c75f5612bb/gistfile1.txt';

async function getColors () {
  return await csv(colorsUrl);
}

function ColorsRoute () {
  const { data, error, loading } = useFetch(getColors);

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

      <HandleAsync
        MainComponent={Colors}
        error={error}
        loading={loading}
        colors={data}
        size={800}
      />
    </div>
  );
}

export default ColorsRoute;