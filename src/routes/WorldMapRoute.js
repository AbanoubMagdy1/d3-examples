import { Typography } from '@mui/material';
import useWorldMap from '../hooks/useWorldMap';

import HandleAsync from '../components/HandleAsync/HandleAsync';
import CitiesMap from '../components/Maps/CitiesMap';
import { csv } from 'd3';
import useFetch from '../hooks/useFetch';

const citiesUrl = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';

function rowFormat (row, i) {
  if (i < 500) {
    row.lat = +row.lat;
    row.lng = +row.lng;
    row.population = +row.population;
    return row;
  }
}

function getCities () {
  return csv(citiesUrl, rowFormat);
}

function WorldMapRoute () {
  const { data, error, loading } = useWorldMap();
  const { data: cities, error: errorCities, loading: loadingCities } = useFetch(getCities);

  return (
    <div className='container'>

      <div>
        <Typography variant="h3" align='center'>World Map</Typography>
        <p className='description'>
          D3 world map using world-atlas with d3-geo
        </p>
      </div>

      <HandleAsync
        error={error || errorCities}
        loading={loading || loadingCities}
      >
        <CitiesMap
          worldMap={data}
          cities={cities}
        />
      </HandleAsync>
    </div>
  );
}

export default WorldMapRoute;