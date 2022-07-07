import { max, scaleBand, scaleLinear } from 'd3';
import { memo } from 'react';

import XAxisStr from '../Axis/XAxisStr';
import YAxisNum from '../Axis/YAxisNum';



function VerticalBarChart ({ data, xField, yField, width, height }) {
  const margin = { top: 0, left: 80, bottom: 80, right: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand()
    .domain(data.map(record => record[xField]))
    .range([0, innerWidth])
    .paddingInner(0.1);

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
          title={yField}
        />

        <XAxisStr
          height={innerHeight}
          width={innerWidth}
          xScale={xScale}
          title={xField}
        />

        {data.map(data => {
          const barHeight = yScale(data[yField]);
          return <rect
            key={data[xField]}
            width={xScale.bandwidth()}
            height={barHeight}
            x={xScale(data[xField])}
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