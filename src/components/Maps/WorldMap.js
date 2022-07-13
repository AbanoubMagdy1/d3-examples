import { geoPath, geoEqualEarth, geoGraticule } from 'd3';
import { memo } from 'react';

function WorldMap ({
  worldMap,
  projection,
  width,
  height,
  countryColor,
  borderColor,
  worldColor,
  children
}) {

  const projectionFunc = projection || geoEqualEarth();
  const graticule = geoGraticule();

  const path = geoPath(projectionFunc);

  const { countries, boundaries } = worldMap;

  return (
    <svg width={width} height={height}>
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
  width: 960,
  height: 500,
  countryColor: '#156b60',
  borderColor: 'white',
  worldColor: '#8fbaf2'
};

export function withWorldMap (Component, projection) {
  return function Wrapped ({ worldMap,
    width,
    height,
    countryColor,
    borderColor,
    worldColor,
    children,
    ...props }) {
    return <WorldMap
      worldMap={worldMap}
      width={width}
      height={height}
      projection={projection}
      countryColor={countryColor}
      borderColor={borderColor}
      worldColor={worldColor}
      children={children}
    >
      <Component {...props}/>
    </WorldMap>;
  };
}

export default memo(WorldMap);