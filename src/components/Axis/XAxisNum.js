import { format } from 'd3';

function XAxisNum ({ height, xScale }) {
  const ticks = xScale.ticks(6);

  return (
    <>
      {ticks.map(tickValue => <g
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
      >
        <line
          y2={height}
          stroke="black"
        />
        <text
          textAnchor='middle'
          transform={`translate(0, ${height + 30})`}
        >
          {format('.2s')(tickValue).replace(/G/, 'B')}
        </text>

      </g>)}
    </>
  );
}

export default XAxisNum;