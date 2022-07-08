import { format } from 'd3';
import { capitalize } from '../../utils';

function YAxisNum ({ width, height, yScale, title }) {
  const yScaleTicks = yScale.ticks(6);
  const yAxisTitleOffset = 70;

  return (
    <g className='axis axisY'>
      <text className='title'
        y={height / 2 - yAxisTitleOffset}
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(-90, 0, ${height / 2})`}
      >
        {capitalize(title)}
      </text>

      {yScaleTicks.map(tickValue => <g
        key={tickValue}
        transform={`translate(0, ${yScale(tickValue)})`}
      >
        <line
          x2={width}
          stroke="black"
        />
        <text
          className='label'
          style={{ textAnchor: 'middle' }}
          dy=".4rem"
          dx="-1.6rem"
        >
          {format('.2s')(tickValue).replace(/G/, 'B')}
        </text>
      </g>)}
    </g>
  );
}

export default YAxisNum;