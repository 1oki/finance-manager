import React, {useRef, useEffect} from "react";
import * as d3 from "d3";

const Svg: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const { select, selectAll } = d3;
    useEffect(() => {
        // select(svgRef.current)
        //     .append('rect')
        //     .attr('width', 100)
        //     .attr('height', 100)
        //     .attr('fill', 'blue')
        selectAll('rect')
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', 'blue')
            .attr('x', (_, i) => i*101 )
    })
    return (
        <div>
            <svg ref={svgRef} > 
                <rect />
                <rect />
                <rect />
            </svg>
        </div>
    )
}

export default Svg; 