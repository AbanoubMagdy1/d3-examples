import { arc } from 'd3';
import { useMemo } from 'react';
// import { arc } from 'd3';

/*
function mouthPathGenerator (size) {
  const tiny = size / 10;
  return `M${size / 4},${tiny * 7} C${tiny * 4},${tiny * 9} ${tiny * 6},${tiny * 9} ${size / 4 * 3},${tiny * 7}`;
}*/

function degToRad (deg) {
  return deg * (Math.PI / 180);
}

function Face ({ size, strokeWidth, faceColor }) {
  const eyeXOffset = size / 4.7;
  const eyeYOffset = size / 5;

  const mouthArc = useMemo(function () {
    return arc()
      .innerRadius(size / 4)
      .outerRadius(size / 4 + strokeWidth)
      .startAngle(degToRad(110))
      .endAngle(degToRad(250));
  }, [size]);

  return (
    <svg width={size} height={size}>
      <g transform={`translate(${size / 2},${size / 2})`}>
        <circle
          r={size / 2 - strokeWidth / 2}
          fill={faceColor}
          stroke="#000"
          strokeWidth={strokeWidth}
        />

        <circle cx={-eyeXOffset} cy={-eyeYOffset} r={size / 15} fill="#000"/>
        <circle cx={eyeXOffset} cy={-eyeYOffset} r={size / 15} fill="#000"/>
        <path d={mouthArc()} />
      </g>
    </svg>
  );
}

Face.defaultProps = {
  size: 400,
  strokeWidth: 15,
  faceColor: '#f7ef4a'

};

export default Face;