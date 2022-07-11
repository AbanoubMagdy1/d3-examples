import { Typography } from '@mui/material';
import useWorldMap from '../hooks/useWorldMap';

import HandleAsync from '../components/HandleAsync/HandleAsync';
import WorldMap from '../components/Maps/WorldMap';

function WorldMapRoute () {
  const { data, error, loading } = useWorldMap();

  return (
    <div className='container'>

      <div>
        <Typography variant="h3" align='center'>World Map</Typography>
        <p className='description'>
          D3 world map using world-atlas with d3-geo
        </p>
      </div>

      <HandleAsync
        error={error}
        loading={loading}
      >
        <WorldMap
          data={data}
        />
      </HandleAsync>
    </div>
  );
}

export default WorldMapRoute;