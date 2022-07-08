import { capitalize } from '../../utils';

function truncate (str, max = 8) {
  return str.length <= max ?
    str :
    str.slice(0, 8) + '.'.repeat(Math.min(3, str.length - 8));
}

function YAxisStr ({ yScale, height, title }) {
  const yScaleTicks = yScale.domain();
  const yAxisTitleOffset = 70;

  return (
    <g className="axis axisY">

      <text className='title'
        y={height / 2 - yAxisTitleOffset}
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(-90, 0, ${height / 2})`}
      >
        {capitalize(title)}
      </text>

      {yScaleTicks.map(tickValue => <g
        className="axis"
        key={tickValue}
        transform={`translate(0, ${yScale(tickValue) + (yScale.bandwidth() / 2)})`}
      >
        <line
          x2={-5}
          stroke="black"
        />
        <text
          className="label"
          style={{ textAnchor: 'end' }}
          dy=".4rem"
          dx="-.5rem"
        >
          {truncate(tickValue)}
        </text>
      </g>)}
    </g>
  );
}

export default YAxisStr;