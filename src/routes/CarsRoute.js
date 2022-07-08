import useChange from '../hooks/useChange';
import { Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ScatterPlot from '../components/ScatterPlot/ScatterPlot';
import useFetch from '../hooks/useFetch';
import { csv } from 'd3';
import HandleAsync from '../components/HandleAsync/HandleAsync';
import { capitalize } from '../utils';

const carsUrl = 'https://gist.githubusercontent.com/omarish/5687264/raw/7e5c814ce6ef33e25d5259c1fe79463c190800d9/mpg.csv';

async function getCars () {
  const cars = await csv(carsUrl);
  return cars.slice(0, 100);
}

const fields = ['mpg', 'cylinders', 'displacement', 'horsepower', 'weight', 'acceleration', 'model_year'];


function CarsRoute () {
  const { data, error, loading } = useFetch(getCars);
  const [xField, handleXChange] = useChange('acceleration');
  const [yField, handleYChange] = useChange('horsepower');

  return (
    <div className='container'>
      <div>
        <Typography variant="h3" align='center'>Cars scatter plot</Typography>
        <p className='description'>
          D3 scatter plot
        </p>
      </div>

      <div className='container-row'>
        <FormControl>
          <InputLabel>X-Field</InputLabel>
          <Select
            value={xField}
            label="Age"
            onChange={handleXChange}
          >
            {fields.map(field => <MenuItem
              value={field}
              key={field}
            >
              {capitalize(field)}
            </MenuItem>)}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Y-Field</InputLabel>
          <Select
            value={yField}
            label="Age"
            onChange={handleYChange}
          >
            {fields.map(field => <MenuItem
              value={field}
              key={field}
            >
              {capitalize(field)}
            </MenuItem>)}
          </Select>
        </FormControl>

      </div>

      <HandleAsync
        error={error}
        loading={loading}
      >

        <ScatterPlot
          data={data}
          xField={xField}
          yField={yField}
          labelField="name"
          width={Math.max(800, window.innerWidth * (3 / 4))}
        />
      </HandleAsync>
    </div>
  );
}

export default CarsRoute;