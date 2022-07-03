function truncate (str, max = 8) {
  return str.length <= max ?
    str :
    str.slice(0, 8) + '.'.repeat(Math.min(3, str.length - 8));
}

function XAxisStr ({ height, xScale }) {
  const ticks = xScale.domain();

  return (
    <>
      {ticks.map(text => <g
        key={text}
        transform={`translate(${xScale(text) + (xScale.bandwidth() / 2)}, ${height})`}
      >
        <line
          y2={10}
          stroke="black"
        />
        <text
          textAnchor='middle'
          transform='translate(0, 30)'
        >
          {truncate(text)}
        </text>

      </g>)}
    </>
  );
}

export default XAxisStr;