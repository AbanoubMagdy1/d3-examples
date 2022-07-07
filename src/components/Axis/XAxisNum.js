import { format } from 'd3';
import { capitalize } from '../../utils';

function XAxisNum ({ height, width, title, xScale }) {
  const ticks = xScale.ticks(6);
  const xAxisTitleOffset = 70;

  return (
    <g className='axis axisX'>
      <text className="title"
        x={width / 2}
        y={height + xAxisTitleOffset}
        textAnchor="middle"
      >
        {capitalize(title)}
      </text>

      {ticks.map(tickValue => <g
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
      >
        <line
          y2={height}
          stroke="black"
        />
        <text
          className='label'
          textAnchor='middle'
          transform={`translate(0, ${height + 30})`}
        >
          {format('.2s')(tickValue).replace(/G/, 'B')}
        </text>

      </g>)}
    </g>
  );
}

export default XAxisNum;