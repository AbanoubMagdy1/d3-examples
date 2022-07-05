import { max, scaleBand, scaleLinear, scaleOrdinal, schemePaired } from 'd3';
import { memo } from 'react';

import StackedBar from './StackedBar';
import XAxisStr from '../Axis/XAxisStr';
import YAxisNum from '../Axis/YAxisNum';



function StackedBarChart (
  { data, xField, yField, colorField, innerYField, width, height, tooltipEnter, tooltipLeave }
) {
  const margin = { top: 0, left: 60, bottom: 60, right: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barSpacing = 10;

  const xScale = scaleBand()
    .domain(data.map(record => record[xField]))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, record => +record[yField])])
    .range([0, innerHeight * .98]);

  const colorScale = scaleOrdinal(schemePaired);

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

        {data.map((data, i) => {
          return <g
            key={i}
            transform={`translate(${xScale(data[xField]) + (barSpacing / 2)} ,0)`}
          >
            <StackedBar
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              spacing={barSpacing}
              totalHeight={innerHeight}
              data={data}
              colorField={colorField}
              yField={innerYField}
              tooltipEnter={tooltipEnter}
              tooltipLeave={tooltipLeave}
            />
          </g>;
        })}
      </g>
    </svg>
  );
}

StackedBarChart.defaultProps = {
  width: 900,
  height: 600
};

export default memo(StackedBarChart);