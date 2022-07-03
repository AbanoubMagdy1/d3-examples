import { max, scaleBand, scaleLinear } from 'd3';
import { memo } from 'react';

import XAxisStr from '../Axis/XAxisStr';
import YAxisNum from '../Axis/YAxisNum';



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

  return (
    <svg width={width} height={height} >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <line
          y2={innerHeight}
          stroke='black'
        />

        <YAxisNum
          width={innerWidth}
          height={innerHeight}
          yScale={yScale}
        />

        <XAxisStr
          height={innerHeight}
          xScale={xScale}
        />

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