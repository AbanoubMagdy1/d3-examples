import { max, scaleBand, scaleLinear, scaleOrdinal, schemePaired } from 'd3';
import { memo } from 'react';

import StackedBar from './StackedBar';
import XAxisStr from '../Axis/XAxisStr';
import YAxisNum from '../Axis/YAxisNum';



function StackedBarChart (
  { data, xField, yField, colorField, innerYField, width, height, tooltipEnter, tooltipLeave }
) {
  const margin = { top: 0, left: 80, bottom: 80, right: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand()
    .domain(data.map(record => record[xField]))
    .range([0, innerWidth])
    .paddingInner(0.1);

  const yScale = scaleLinear()
    .domain([0, max(data, record => +record[yField])])
    .range([innerHeight, 0]);

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
          title={yField}
        />

        <XAxisStr
          height={innerHeight}
          width={innerWidth}
          xScale={xScale}
          title={xField}
        />

        {data.map((data, i) => {
          return <g
            key={i}
            transform={`translate(${xScale(data[xField])} ,0)`}
          >
            <StackedBar
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
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