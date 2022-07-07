import React from 'react';
import { Typography } from '@mui/material';
import ScatterPlot from '../components/ScatterPlot/ScatterPlot';
import useFetch from '../hooks/useFetch';
import { csv } from 'd3';
import HandleAsync from '../components/HandleAsync/HandleAsync';

const carsUrl = 'https://gist.githubusercontent.com/omarish/5687264/raw/7e5c814ce6ef33e25d5259c1fe79463c190800d9/mpg.csv';

async function getCars () {
  const cars = await csv(carsUrl);
  return cars.slice(0, 100);
}

function CarsRoute () {
  const { data, error, loading } = useFetch(getCars);


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
        error={error}
        loading={loading}
      >

        <ScatterPlot
          data={data}
          xField="acceleration"
          yField="horsepower"
          labelField="name"
        />
      </HandleAsync>
    </div>
  );
}

export default CarsRoute;