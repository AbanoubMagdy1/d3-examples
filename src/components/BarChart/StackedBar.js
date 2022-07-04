import { memo } from 'react';

function StackedBar (
  { xScale, spacing, totalHeight, yScale, colorScale, data, yField, colorField }
) {
  let prevVal = 0;
  let curVal = 0;
  return (
    <>
      {data.children.map(obj => {
        const height = yScale(+obj[yField]);
        prevVal = curVal;
        curVal += height;

        return <rect
          y={totalHeight - height - prevVal}
          width={xScale.bandwidth() - spacing}
          height={height}
          fill={colorScale(obj[colorField])}
        />;
      })}
    </>
  );
}

export default memo(StackedBar);