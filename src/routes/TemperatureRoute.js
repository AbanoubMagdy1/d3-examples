import { Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { csv, timeFormat } from 'd3';

import HandleAsync from '../components/HandleAsync/HandleAsync';
import TimeChart from '../components/TimeChart/TimeChart';

const temperatureUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

function formatRow (row) {
  row.hour = new Date(row.timestamp);
  row.temperature = +row.temperature;
  return row;
}

async function getTemperatures () {
  return await csv(temperatureUrl, formatRow);
}

function TemperatureRoute () {
  const { data, error, loading } = useFetch(getTemperatures);

  return (
    <div className='container'>

      <div>
        <Typography variant="h3" align='center'>Temperature line chart</Typography>
        <p className='description'>
          D3 line chart
        </p>
      </div>

      <HandleAsync
        error={error}
        loading={loading}
      >
        <TimeChart
          data={data}
          xField='hour'
          yField="temperature"
          timeFormat={timeFormat('%a %d')}
          width={Math.min(1000, window.innerWidth * (3 / 4))}
          type="line"
        />
      </HandleAsync>
    </div>
  );
}

export default TemperatureRoute;