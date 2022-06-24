import React from 'react';

function mouthPathGenerator (size) {
  const tiny = size / 10;
  return `M${size / 4},${tiny * 7} C${tiny * 4},${tiny * 9} ${tiny * 6},${tiny * 9} ${size / 4 * 3},${tiny * 7}`;
}
function Face ({ size, strokeWidth, faceColor }) {
  return (
    <svg width={size} height={size}>
      <g width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
          fill={faceColor}
          stroke="#000"
          strokeWidth={strokeWidth}
        />

        <circle cx={size / 20 * 6} cy={size / 3} r={size / 12} fill="#000"/>
        <circle cx={size / 20 * 14} cy={size / 3} r={size / 12} fill="#000"/>
        <path d={mouthPathGenerator(size)} fill='none' stroke='#000' strokeWidth={strokeWidth / 2}/>
      </g>
    </svg>
  );
}

Face.defaultProps = {
  size: 400,
  strokeWidth: 5,
  faceColor: '#f7ef4a'

};

export default Face;