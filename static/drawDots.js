function drawDots(projection, dotData){
	    // add circles to svg
	const svg = d3.select("#chart")
    dotData = JSON.parse(dotData);

    var secondsSum = 0;
    var secondsList = dotData.map(function(point) {
        if (point.seconds_to_completion != 'incomplete') {
            return point.seconds_to_completion
        }
    })
    for( var i = 0; i < secondsList.length; i++ ) {
        secondsSum += secondsList[i]; //don't forget to add the base
    }
    var avgSeconds = secondsSum/secondsList.length;

    svg.selectAll("circle")
        .data(function(){
            var newArray = dotData.map(function(point){
                return point.coordinates
            })
            return newArray
        })
        .enter().append("circle")
        .attr("cx", function (d) { return projection(d)[0]; })
        .attr("cy", function (d) { return projection(d)[1]; })
        .attr("r", function(d, i) {
            let numPix = dotData[i].seconds_to_completion
            if (typeof numPix != "string") {
                return numPix/60/60/24/7 + 'px';
            }
            else {
                numPix = parseFloat(numPix.split('-')[1])
                return numPix/60/60/24/7 + 'px';
            }
        })
        .attr("fill", function(d, i) {
            if (typeof dotData[i].seconds_to_completion != "string") {
                return 'dodgerblue'
            }
            else {
                return 'coral'
            }
        })
        .style('opacity', function(d, i) {
            return 0.25
        //     let secondsToCompletion = dotData[i].seconds_to_completion
        //     if (typeof secondsToCompletion != "string") {
        //         return secondsToCompletion/(avgSeconds*avgSeconds);
        //     }
        //     else {
        //         secondsToCompletion = parseFloat(secondsToCompletion.split('-')[1])
        //         return secondsToCompletion/(avgSeconds*avgSeconds);
        //     }
        })
}