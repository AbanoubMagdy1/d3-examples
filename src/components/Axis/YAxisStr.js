function truncate (str, max = 8) {
  return str.length <= max ?
    str :
    str.slice(0, 8) + '.'.repeat(Math.min(3, str.length - 8));
}

function YAxisStr ({ yScale }) {
  const yScaleTicks = yScale.domain();

  return (
    <>
      {yScaleTicks.map(tickValue => <g
        key={tickValue}
        transform={`translate(0, ${yScale(tickValue) + (yScale.bandwidth() / 2)})`}
      >
        <line
          x2={-5}
          stroke="black"
        />
        <text
          style={{ textAnchor: 'end' }}
          dy=".4rem"
          dx="-.5rem"
        >
          {truncate(tickValue)}
        </text>
      </g>)}
    </>
  );
}

export default YAxisStr;