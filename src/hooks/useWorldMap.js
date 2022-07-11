import useFetch from './useFetch';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const worldMapUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

async function getWorldMap () {
  const data = await json(worldMapUrl);
  const { countries } = data.objects;
  return {
    countries: feature(data, countries),
    boundaries: mesh(data, countries, (a, b) => a !== b)
  };
}

function useWorldMap () {
  const { data, error, loading } = useFetch(getWorldMap);
  return { data, error, loading };
}

export default useWorldMap;