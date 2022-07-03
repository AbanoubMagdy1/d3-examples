import { max, scaleBand, scaleLinear } from 'd3';
import { memo } from 'react';

import XAxisNum from '../Axis/XAxisNum';
import YAxisStr from '../Axis/YAxisStr';



function HorizontalBarChart ({ data, xField, yField, width, height }) {
  const margin = { top: 0, left: 60, bottom: 60, right: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barSpacing = 10;

  const xScale = scaleLinear()
    .domain([0, max(data, record => +record[xField])])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(record => record[yField]))
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height} >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <line
          y2={innerHeight}
          stroke='black'
        />

        <XAxisNum
          width={innerWidth}
          height={innerHeight}
          xScale={xScale}
        />

        <YAxisStr
          yScale={yScale}
        />

        {data.map(data => {
          const barWidth = xScale(data[xField]);
          return <rect
            key={data.country}
            width={barWidth}
            height={yScale.bandwidth() - barSpacing}
            x={0}
            y={yScale(data[yField])}
            fill='#54BAB9'
            opacity={.8}
          />;
        })}
      </g>
    </svg>
  );
}

HorizontalBarChart.defaultProps = {
  width: 500,
  height: 500
};

export default memo(HorizontalBarChart);