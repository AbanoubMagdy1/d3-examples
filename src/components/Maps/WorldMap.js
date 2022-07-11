import { geoPath, geoEqualEarth, geoGraticule } from 'd3';
import { memo } from 'react';


function WorldMap ({
  data,
  width,
  height,
  countryColor,
  borderColor,
  worldColor,
  children
}) {
  const projection = geoEqualEarth();
  const graticule = geoGraticule();
  const path = geoPath(projection);

  const { countries, boundaries } = data;

  return (
    <svg width={width} height={height} >
      <g>
        <path
          d={path({ type: 'Sphere' })}
          fill={worldColor}
        />

        <path
          d={path(graticule())}
          fill="none"
          stroke="white"
        />
        {countries.features.map((countryPath, i) => <path
          key={i}
          d={path(countryPath)}
          fill={countryColor}
        />)}

        <path
          d={path(boundaries)}
          fill="none"
          stroke={borderColor}
        />
        {children}
      </g>
    </svg>
  );
}

WorldMap.defaultProps = {
  width: 1000,
  height: 700,
  countryColor: '#156b60',
  borderColor: 'white',
  worldColor: '#8fbaf2'
};

export default memo(WorldMap);