import React, { useMemo, useState } from 'react';
import useToggle from '../hooks/useToggle';
import { map, eqProps, groupWith, pipe, reduce, prop, add, dissoc, sort, sortBy, reverse, take, applySpec, head } from 'ramda';
import { Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { csv, format } from 'd3';

import HandleAsync from '../components/HandleAsync/HandleAsync';
import StackedBarChart from '../components/BarChart/StackedBarChart';
import ToolTip from '../components/ToolTip/ToolTip';

const religionUrl = 'https://gist.githubusercontent.com/curran/0d2cc6698cad72a48027b8de0ebb417d/raw/8434d10333e3fa7631392af1b5a276ba02384483/religionByCountryTop20.csv';

async function getReligions () {
  return await csv(religionUrl);
}

const formatReligions = pipe(
  take(8 * 16),
  sortBy(prop('religion')),
  groupWith(eqProps('religion')),
  map(
    applySpec({
      religion: pipe(head, prop('religion')),
      totalPopulation: pipe(
        map(prop('population')),
        reduce(add, 0)
      ),
      children: pipe(
        map(dissoc('religion')),
        sort((a, b) => b.population - a.population)
      )
    })
  ),
  sortBy(prop('totalPopulation')),
  reverse
);

function ReligionRoute () {
  const { data, error, loading } = useFetch(getReligions);
  const [openToolTip, toggle] = useToggle(false);
  const [country, setCountry] = useState('');
  const [population, setPopulation] = useState('');

  const religions = useMemo(() => {
    if (!data) {
      return [];
    }

    return formatReligions(data);
  }, [data]);

  function tooltipEnter (country, population) {
    toggle(true);
    setCountry(country);
    setPopulation(format(',.2r')(population));
  }

  function tooltipLeave () {
    toggle(false);
  }

  return (
    <div className='container'>

      <ToolTip open={openToolTip}>
        <p>Country: {country}</p>
        <p>Population: {population}</p>
      </ToolTip>

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
          xField="religion"
          yField="totalPopulation"
          colorField="country"
          innerYField="population"
          tooltipEnter={tooltipEnter}
          tooltipLeave={tooltipLeave}
        />
      </HandleAsync>
    </div>
  );
}

export default ReligionRoute;