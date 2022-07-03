import { max, scaleBand, scaleLinear, format } from 'd3';
import { memo } from 'react';



function VerticalBarChart ({ data, xField, yField, width, height }) {
  const margin = { top: 0, left: 60, bottom: 60, right: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barSpacing = 10;

  const xScale = scaleBand()
    .domain(data.map(record => record[xField]))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, record => +record[yField])])
    .range([0, innerHeight]);

  const yScaleTicks = yScale.ticks(6);
  const xScaleTicks = xScale.domain();

  return (
    <svg width={width} height={height} >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {yScaleTicks.map(tickValue => <g
          key={tickValue}
          transform={`translate(0, ${innerHeight - yScale(tickValue)})`}
        >
          <line
            x2={innerWidth}
            stroke="black"
          />
          <text
            style={{ textAnchor: 'middle' }}
            dy=".3rem"
            dx="-1.5rem"
          >
            {format('.2s')(tickValue).replace(/G/, 'B')}
          </text>
        </g>)}

        {xScaleTicks.map(text => <g
          key={text}
          transform={`translate(${xScale(text) + (xScale.bandwidth() / 2)}, ${innerHeight})`}
        >
          <line
            y2={10}
            stroke="black"
          />
          <text
            textAnchor='middle'
            transform='translate(0, 30)'
          >
            {text}
          </text>

        </g>)}

        {data.map(data => {
          const barHeight = yScale(data[yField]);
          return <rect
            key={data.country}
            width={xScale.bandwidth() - barSpacing}
            height={barHeight}
            x={xScale(data[xField]) + (barSpacing / 2)}
            y={innerHeight - barHeight}
            fill='#54BAB9'
            opacity={.8}
          />;
        })}
      </g>
    </svg>
  );
}

VerticalBarChart.defaultProps = {
  width: 500,
  height: 500
};

export default memo(VerticalBarChart);