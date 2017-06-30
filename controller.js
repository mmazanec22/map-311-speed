jQuery(document).ready(() => {
	const projection = drawChicago();
	const dotData = processData();
	drawDots(projection, dotData);
});
