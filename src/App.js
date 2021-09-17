import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3'
import './App.css'

//let d3 handle the controlling of dom through use ref
function App() {
  const [data] = useState([1,5,7,6,2]);
  const svgRef = useRef();
  useEffect(() => {
    //setup svg
    const w = 400;
    const h = 100;
    const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('width', w)
        .style('background', 'd3d3d3')
        .style('margin-top', '50')
    //setup scaling
    //setup axes
    console.log(h);
    //setup data for svg
    console.log(svg);
  } ,[data]);

  return (
    <div className="App">
      <svg ref={svgRef}> </svg>
    </div>
  );
}

export default App;
