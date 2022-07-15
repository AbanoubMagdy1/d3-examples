import { easeCubicOut, transition, extent, scaleLinear, scaleOrdinal, schemeCategory10, select, easeLinear, sort } from 'd3';
import { both, not, pipe, pluck, prop, uniq } from 'ramda';
import { useState, memo, useEffect, useRef } from 'react';

import XAxisNum from '../Axis/XAxisNum';
import YAxisNum from '../Axis/YAxisNum';
import ColorLegend from '../Legend/ColorLegend';

function getTransition (type, duration) {
  return transition()
    .duration(duration)
    .ease(type);
}


function ScatterPlot ({
  data,
  xField,
  yField,
  labelField,
  colorField,
  width,
  height }) {

  const [hoveredVal, setHoveredVal] = useState();
  const svgRef = useRef();
  const margin = { top: 10, left: 100, bottom: 80, right: colorField ? 200 : 10 };
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

  const colorScale = scaleOrdinal()
    .domain(pipe(pluck(colorField), uniq)(data))
    .range(schemeCategory10)
  ;

  useEffect(() => {
    const circlesUpdate = select(svgRef.current)
      .select('.main')
      .selectAll('.main > circle')
      .data(filterData(data))
      .style('opacity', obj =>
        !colorField || !hoveredVal || hoveredVal === obj[colorField] ? 1 : .2)
      .call(update => update.transition(getTransition(easeCubicOut, 1000))
        .attr('cx', pipe(prop(xField), Number, xScale))
        .attr('cy', pipe(prop(yField), Number, yScale))
      );

    const circleEnter = circlesUpdate
      .enter()
      .append('circle')
      .attr('r', 7)
      .attr('fill', obj => colorField ? colorScale(obj[colorField]) : '#53B1B9')
      .call(enter => enter.transition(getTransition(easeCubicOut, 2000))
        .attr('cx', pipe(prop(xField), Number, xScale))
        .attr('cy', pipe(prop(yField), Number, yScale))
        .delay((obj, i) => i * 10)
      )
      .append('title')
      .text(prop(labelField));

    const circleExit = circlesUpdate.exit()
      .call(exit => exit.transition(getTransition(easeLinear, 1000))
        .attr('cy', innerHeight + 50)
        .style('opacity', 0)
        .remove());

  }, [xField, yField, hoveredVal]);
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
  console.log(colorScale.domain());
  return (
    <svg width={width} height={height} ref={svgRef}>
      <g className='main' transform={`translate(${margin.left},${margin.top})`}>
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

        {colorField && <ColorLegend
          colorScale={colorScale}
          title={colorField}
          width={innerWidth}
          hoveredVal={hoveredVal}
          setHoveredVal={setHoveredVal}
        />}
      </g>
    </svg>
  );
}

ScatterPlot.defaultProps = {
  width: 600,
  height: 600
};

export default memo(ScatterPlot);