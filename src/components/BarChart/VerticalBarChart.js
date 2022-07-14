import { easeExpIn, max, scaleBand, scaleLinear, select, transition } from 'd3';
import { pipe, prop, subtract } from 'ramda';
import { memo, useEffect, useRef } from 'react';
import { numberWithCommas } from '../../utils';

import XAxisStr from '../Axis/XAxisStr';
import YAxisNum from '../Axis/YAxisNum';

const trans = transition()
  .duration(1000)
  .ease(easeExpIn);

function VerticalBarChart ({ data, xField, yField, width, height }) {
  const svgRef = useRef();
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

  useEffect(() => {
    const rects = select(svgRef.current)
      .select('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('x', pipe(prop(xField), xScale))
      .attr('y', pipe(prop(yField), yScale))
      .attr('fill', '#54BAB9');

    rects.transition(trans)
      .attr('height', pipe(prop(yField), yScale, subtract(innerHeight)));
    rects.append('title')
      .text(pipe(prop(yField), numberWithCommas));

  }, []);

  /*
{data.map(data => {
          const height = innerHeight - yScale(data[yField]);
          return <rect
            key={data[xField]}
            width={xScale.bandwidth()}
            height={height}
            x={xScale(data[xField])}
            y={yScale(data[yField])}
            fill='#54BAB9'
            opacity={.8}
          >
            <title>{numberWithCommas(data[yField])}</title>
          </rect>;
        })}
*/

  return (
    <svg width={width} height={height} ref={svgRef}>
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


      </g>
    </svg>
  );
}

VerticalBarChart.defaultProps = {
  width: 500,
  height: 500
};

export default memo(VerticalBarChart);