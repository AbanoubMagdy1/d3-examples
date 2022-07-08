import { line, extent, scaleLinear, scaleTime, curveNatural, area } from 'd3';
import { memo } from 'react';
import propTypes from 'prop-types';

import XAxisNum from '../Axis/XAxisNum';
import YAxisNum from '../Axis/YAxisNum';

function TimeLineChart ({ type, data, xField, yField, width, height, lineColor, timeFormat }) {
  function getShape (type) {
    switch (type) {
      case 'area':
        return area()
          .x(data => xScale(data[xField]))
          .y1(data => yScale(data[yField]))
          .y0(innerHeight)
          .curve(curveNatural);
      case 'line':
        return line()
          .x(data => xScale(data[xField]))
          .y(data => yScale(data[yField]))
          .curve(curveNatural);
    }
  }

  const margin = { top: 10, left: 100, bottom: 80, right: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, record => record[xField]))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, record => +record[yField]))
    .range([innerHeight, 0]);

  const temperatureShape = getShape(type);

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
          formatFunc={timeFormat}
        />

        <YAxisNum
          width={innerWidth}
          height={innerHeight}
          yScale={yScale}
          title={yField}
        />

        <path
          d={temperatureShape(data)}
          fill={type === 'line' ? 'none' : lineColor}
          stroke={lineColor}
          strokeWidth={3}
        />
      </g>
    </svg>
  );
}

TimeLineChart.defaultProps = {
  width: 600,
  height: 600,
  lineColor: '#6E85B7',
  type: 'line'
};

TimeLineChart.propTypes = {
  type: propTypes.oneOf(['line', 'area'])
};

export default memo(TimeLineChart);