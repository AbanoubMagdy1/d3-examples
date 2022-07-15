import { easeQuadOut, max, scaleBand, scaleLinear, select, transition } from 'd3';
import { pipe, prop } from 'ramda';
import { memo, useEffect, useRef } from 'react';
import { numberWithCommas } from '../../utils';

import XAxisNum from '../Axis/XAxisNum';
import YAxisStr from '../Axis/YAxisStr';

function getTransition () {
  return transition()
    .duration(1000)
    .ease(easeQuadOut);
}

function HorizontalBarChart ({ data, xField, yField, width, height }) {
  const svgRef = useRef();
  const margin = { top: 0, left: 100, bottom: 80, right: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(data, record => +record[xField])])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(record => record[yField]))
    .range([0, innerHeight])
    .paddingInner(.15);

  useEffect(() => {
    const rects = select(svgRef.current)
      .select('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', yScale.bandwidth())
      .attr('x', 0)
      .attr('y', pipe(prop(yField), yScale))
      .attr('fill', '#54BAB9');

    rects.transition(getTransition())
      .attr('width', pipe(prop(xField), xScale))
      .delay(300);

    rects.append('title')
      .text(pipe(prop(xField), numberWithCommas));

  }, []);

  return (
    <svg width={width} height={height} ref={svgRef}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <line
          y2={innerHeight}
          stroke='black'
        />

        <XAxisNum
          width={innerWidth}
          height={innerHeight}
          xScale={xScale}
          title={xField}
        />

        <YAxisStr
          height={innerHeight}
          title={yField}
          yScale={yScale}
        />
      </g>
    </svg>
  );
}

HorizontalBarChart.defaultProps = {
  width: 600,
  height: 500
};

export default memo(HorizontalBarChart);