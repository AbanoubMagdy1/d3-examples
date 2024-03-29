import { capitalize, truncate } from '../../utils';

function XAxisStr ({ height, width, xScale, title }) {
  const ticks = xScale.domain();
  const xAxisTitleOffset = 70;

  return (
    <g className="axis axisX">
      <text className="title"
        x={width / 2}
        y={height + xAxisTitleOffset}
        textAnchor="middle"
      >
        {capitalize(title)}
      </text>

      {ticks.map(text => <g
        key={text}
        transform={`translate(${xScale(text) + (xScale.bandwidth() / 2)}, ${height})`}
      >
        <line
          y2={10}
          stroke="black"
        />
        <text
          className="label"
          textAnchor='middle'
          transform='translate(0, 30)'
        >
          {truncate(text)}
        </text>

      </g>)}
    </g>
  );
}

export default XAxisStr;