function drawDots(projection, dotData){
	    // add circles to svg

	const svg = d3.select("#chart")
	    
    svg.selectAll("circle")
        .data(dotData)
        .enter().append("circle")
        .attr("cx", function (d) { return projection(d)[0]; })
        .attr("cy", function (d) { return projection(d)[1]; })
        .attr("r", "2px")
        .attr("fill", "red")
}