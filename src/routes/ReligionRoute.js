import React, { useMemo } from 'react';
import { map, eqProps, groupWith, pipe, reduce, prop, slice, add, dissoc, sort } from 'ramda';
import { Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { csv } from 'd3';

import HandleAsync from '../components/HandleAsync/HandleAsync';
import StackedBarChart from '../components/BarChart/StackedBarChart';

const religionUrl = 'https://gist.githubusercontent.com/curran/0d2cc6698cad72a48027b8de0ebb417d/raw/8434d10333e3fa7631392af1b5a276ba02384483/religionByCountryTop20.csv';

async function getReligions () {
  return await csv(religionUrl);
}

const formatReligions = pipe(
  groupWith(eqProps('country')),
  slice(0, 6),
  map(
    (list) => {
      return {
        country: prop('country', list[0]),
        totalPopulation: reduce(add, 0, map(prop('population'), list)),
        children: pipe(
          map(dissoc('country')),
          sort((a, b) => b.population - a.population)
        )(list)
      };
    }
  )
);

function ReligionRoute () {
  const { data, error, loading } = useFetch(getReligions);

  const religions = useMemo(() => {
    if (!data) {
      return [];
    }

    return formatReligions(data);
  }, [data]);

  console.log(religions[0]);

  return (
    <div className='container'>
      <div>
        <Typography variant="h3" align='center'>The Religions stack bar example</Typography>
        <p className='description'>
          D3 stacked bar chart
        </p>
      </div>

      <HandleAsync
        error={error}
        loading={loading}
      >
        <StackedBarChart
          data={religions}
          xField="country"
          yField="totalPopulation"
          colorField="religion"
          innerYField="population"
        />
      </HandleAsync>
    </div>
  );
}

export default ReligionRoute;