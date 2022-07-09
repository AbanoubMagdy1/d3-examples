import { capitalize, truncate } from '../../utils';

function ColorLegend ({
  colorScale,
  tickSize = 10,
  tickHeight = 30,
  legendXOffSet = 50,
  legendYOffSet = 10,
  setHoveredVal,
  title,
  width
}) {
  return (
    <g
      className="legend"
      transform={`translate(${width + legendXOffSet}, ${legendYOffSet})`}>

      <text className="title">{capitalize(title)}</text>

      {colorScale.domain().map((tick, i) => <g
        key={i}
        transform={`translate(0, ${tickHeight * (i + 1)})`}
        onMouseEnter={setHoveredVal.bind(this, tick)}
        onMouseOut={setHoveredVal.bind(this, '')}
      >
        <circle
          r={tickSize}
          fill={colorScale(tick)}
        />
        <text dx={tickSize * 2} dy={tickSize / 2}>{truncate(tick)}</text>
      </g>)}
    </g>
  );
}

export default ColorLegend;