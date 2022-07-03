import { format } from 'd3';

function YAxisNum ({ width, height, yScale }) {
  const yScaleTicks = yScale.ticks(6);

  return (
    <>
      {yScaleTicks.map(tickValue => <g
        key={tickValue}
        transform={`translate(0, ${height - yScale(tickValue)})`}
      >
        <line
          x2={width}
          stroke="black"
        />
        <text
          style={{ textAnchor: 'middle' }}
          dy=".4rem"
          dx="-1.6rem"
        >
          {format('.2s')(tickValue).replace(/G/, 'B')}
        </text>
      </g>)}
    </>
  );
}

export default YAxisNum;