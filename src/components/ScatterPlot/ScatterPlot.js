import { max, min, scaleLinear } from 'd3';
import { memo } from 'react';

import XAxisNum from '../Axis/XAxisNum';
import YAxisNum from '../Axis/YAxisNum';



function ScatterPlot ({ data, xField, yField, labelField, width, height }) {
  const margin = { top: 10, left: 100, bottom: 80, right: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([
      min(data, record => +record[xField]),
      max(data, record => +record[xField])])
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([
      min(data, record => +record[yField]),
      max(data, record => +record[yField])])
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height} >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <line
          y2={innerHeight}
          stroke='black'
        />

        <line
          x2={innerWidth}
          y1={innerHeight}
          y2={innerHeight}
          stroke='black'
        />

        <XAxisNum
          width={innerWidth}
          height={innerHeight}
          xScale={xScale}
          title={xField}
        />

        <YAxisNum
          width={innerWidth}
          height={innerHeight}
          yScale={yScale}
          title={yField}
        />

        {data.map(data => {
          if (isNaN(+data[yField])) {
            return null;
          }
          return <circle
            key={data.country}
            r={5}
            cx={xScale(+data[xField])}
            cy={innerHeight - yScale(+data[yField])}
            fill='#54BAB9'
          >
            <title>{data[labelField]}</title>
          </circle>;
        })}
      </g>
    </svg>
  );
}

ScatterPlot.defaultProps = {
  width: 600,
  height: 600
};

export default memo(ScatterPlot);