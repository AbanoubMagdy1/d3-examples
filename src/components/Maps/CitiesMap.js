import { scaleSqrt, geoEqualEarth } from 'd3';
import { apply, max, pipe, pluck } from 'ramda';
import { withWorldMap } from './WorldMap';

const projection = geoEqualEarth();

const getLargestPopulation = pipe(
  pluck('population'),
  apply(max)
);


function CitiesMap ({ cities }) {
  const sizeScale = scaleSqrt()
    .domain([0, getLargestPopulation(cities)])
    .range([0, 8]);

  return (
    <>
      {cities.map(city => {
        const [xCoord, yCoord] = projection([city.lng, city.lat]);
        return <circle
          key={city.city}
          cx={xCoord}
          cy={yCoord}
          r={sizeScale(city.population)}
          fill="#333"
        >
          <title>{city.city}</title>
        </circle>;
      })}
    </>
  );
}

export default withWorldMap(CitiesMap, projection);