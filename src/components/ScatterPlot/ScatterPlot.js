import { easeCubicOut, transition, extent, scaleLinear, select, easeLinear } from 'd3';
import { both, not, pipe, prop } from 'ramda';
import { memo, useEffect, useRef } from 'react';

import XAxisNum from '../Axis/XAxisNum';
import YAxisNum from '../Axis/YAxisNum';

function getTransition (type, duration) {
  return transition()
    .duration(duration)
    .ease(type);
}


function ScatterPlot ({ data, xField, yField, labelField, width, height }) {
  const svgRef = useRef();
  const margin = { top: 10, left: 100, bottom: 80, right: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  function filterData (data) {
    return data.filter(both(
      pipe(prop(xField), isNaN, not),
      pipe(prop(yField), isNaN, not)
    ));
  }

  const xScale = scaleLinear()
    .domain(extent(data, record => +record[xField]))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, record => +record[yField]))
    .range([innerHeight, 0]);

  useEffect(() => {
    const circlesUpdate = select(svgRef.current)
      .select('g')
      .selectAll('circle')
      .data(filterData(data))
      .call(update => update.transition(getTransition(easeCubicOut, 1000))
        .attr('cx', pipe(prop(xField), Number, xScale))
        .attr('cy', pipe(prop(yField), Number, yScale))
      );

    const circleEnter = circlesUpdate
      .enter()
      .append('circle')
      .attr('r', 7)
      .attr('fill', '#54BAB9')
      .call(enter => enter.transition(getTransition(easeCubicOut, 2000))
        .attr('cx', pipe(prop(xField), Number, xScale))
        .attr('cy', pipe(prop(yField), Number, yScale)))
      .append('title')
      .text(prop(labelField));

    const circleExit = circlesUpdate.exit()
      .call(exit => exit.transition(getTransition(easeLinear, 1000))
        .attr('cy', innerHeight + 50)
        .remove());


  }, [xField, yField]);
  /*
{data.map(data => {
          if (isNaN(+data[yField])) {
            return null;
          }
          return <circle
            key={data.country}
            r={7}
            cx={xScale(+data[xField])}
            cy={yScale(+data[yField])}
            fill='#54BAB9'
          >
            <title>{data[labelField]}</title>
          </circle>;
        })}
*/
  return (
    <svg width={width} height={height} ref={svgRef}>
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


      </g>
    </svg>
  );
}

ScatterPlot.defaultProps = {
  width: 600,
  height: 600
};

export default memo(ScatterPlot);