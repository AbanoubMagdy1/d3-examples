import { pie, arc } from 'd3';
import { memo } from 'react';
import chroma from 'chroma-js';
import './Colors.scss';

function getTextRotation (data) {
  const initialAngle = (radToDeg(data.startAngle) + radToDeg(data.endAngle)) / 2 - 90;
  return initialAngle;
  // If not rotating use this
  // return initialAngle >= 90 && initialAngle <= 270 ? initialAngle - 180 : initialAngle;
}

function radToDeg (rad) {
  return rad * (180 / Math.PI);
}

function Colors ({ size, colors }) {

  const colorsPie = pie()
    .value(1);
    /* .sort(() => 0);
     .startAngle(Math.PI / 4)
    .endAngle(Math.PI * 7 / 4);*/

  const innerRadius = size / 30;
  const outerRadius = size / 2;

  const pieArc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


  function createTextTransform (data) {
    const rotationAngle = getTextRotation(data);
    return `translate(${pieArc.centroid(data)}) rotate(${rotationAngle})`;
  }


  return (
    <svg className="rotatingPalette" width={size} height={size}>
      <g transform={`translate(${size / 2},${size / 2})`}>
        {colorsPie(colors.slice(0, 30)).map((color) => <g key={color.data.keyword}>
          <path
            d={pieArc(color)}
            fill={color.data.hex}
          />
          <text
            textAnchor='middle'
            fill={chroma(color.data.hex).luminance() < .7 ? '#fff' : '#000'}
            fontSize={30}
            transform={createTextTransform(color)}
          >
            {color.data.keyword}
          </text>
        </g>
        )}
      </g>
    </svg>
  );
}

Colors.defaultProps = {
  size: 1200
};

export default memo(Colors);