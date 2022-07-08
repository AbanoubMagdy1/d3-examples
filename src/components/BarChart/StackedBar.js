import { memo } from 'react';

function StackedBar (
  { xScale,
    totalHeight,
    yScale,
    colorScale,
    data,
    yField,
    colorField,
    tooltipEnter,
    tooltipLeave }
) {
  let prevVal = 0;
  let curVal = 0;
  return (
    <>
      {data.children.map(obj => {
        const height = totalHeight - yScale(+obj[yField]);
        prevVal = curVal;
        curVal += height;

        return <rect
          key={obj[colorField]}
          y={totalHeight - height - prevVal}
          width={xScale.bandwidth()}
          height={height}
          fill={colorScale(obj[colorField])}
          onMouseEnter={() => tooltipEnter(obj[colorField], obj[yField])}
          onMouseLeave={tooltipLeave}
        />;
      })}
    </>
  );
}

export default memo(StackedBar);