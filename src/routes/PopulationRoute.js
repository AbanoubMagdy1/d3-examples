import React from 'react';
import { Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { csv } from 'd3';
import HandleAsync from '../components/HandleAsync/HandleAsync';
import VerticalBarChart from '../components/BarChart/VerticalBarChart';

const populatiosUrl = 'https://gist.githubusercontent.com/curran/6cd1e224d76811b68df4/raw/12c93b2e53872d088331d939bdb790019f06dc32/populationByCountry2015.csv';

async function getPopulation () {
  return await csv(populatiosUrl);
}

function PopulationRoute () {
  const { data, error, loading } = useFetch(getPopulation);

  return (
    <div className='container'>
      <div>
        <Typography variant="h3" align='center'>The population of top 5 countries</Typography>
        <p className='description'>
          D3 bar chart
        </p>
      </div>

      <HandleAsync
        MainComponent={VerticalBarChart}
        error={error}
        loading={loading}
        data={data}
        xField="country"
        yField="population"
      />
    </div>
  );
}

export default PopulationRoute;