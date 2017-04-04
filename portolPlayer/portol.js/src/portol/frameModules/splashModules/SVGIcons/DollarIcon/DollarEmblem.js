function DollarEmblem(){
	this.symbol = document.createElementNS(portol_svgns, 'symbol');
	this.symbol.setAttribute('id', 'portol-dollarEmb');
	this.symbol.setAttribute('width', 100);
	this.symbol.setAttribute('height', 100);
	
	this.circle = document.createElementNS(portol_svgns, 'circle');
	this.p1 = document.createElementNS(portol_svgns, 'path');
	this.p2 = document.createElementNS(portol_svgns, 'path');
	
	this.symbol.appendChild(this.circle);
	this.symbol.appendChild(this.p1);
	this.symbol.appendChild(this.p2);


	this.circle.setAttribute('cx', 40);
	this.circle.setAttribute('cy', 40);
	this.circle.setAttribute('r', 25);
	this.circle.setAttribute('fill', 'green');
	
	//this.p1.setAttribute('d',"m 145,312 c -2,69 31,100 104,102 78,1 113,-34 109,-101 -6,-58 -62,-73 -106,-79 -48,-17 -99,-25 -99,-95 0,-48 32,-79 99,-78 60,0 97,25 96,84");
	//this.p1.setAttribute('fill', '#FFFFFF');
	//233.72993,14.801025
	this.p1.setAttribute('d', "m 233.72993,14.801025 30.97001,0 0,28.342438 c 43.74979,3.151313 73.84925,20.828602 90.29846,53.031922 7.70085,14.345095 11.5514,30.970295 11.55166,49.875645 l 0,0.51269 -41.48025,0 c -0.3527,-26.94825 -10.49978,-46.3719 -30.44129,-58.271026 -7.00701,-3.84488 -14.70812,-6.4671 -23.10333,-7.866669 l -6.82525,-0.528717 0,130.721282 c 35.00194,10.85225 57.57653,19.07673 67.72384,24.67346 l 1.05744,0.52872 c 29.39427,16.80162 44.26776,43.5739 44.62051,80.31693 l 0,0.52871 c -2.7e-4,36.40144 -11.89906,65.2779 -35.69641,86.62949 l -12.6091,9.45282 c -17.14346,10.14709 -38.8422,16.27272 -65.09628,18.37692 l 0,54.07333 -30.97001,0 0,-54.07333 c -53.90784,-3.50343 -88.38657,-25.73088 -103.43627,-66.68243 -5.59695,-16.09643 -7.87203,-34.29709 -6.82526,-54.60205 l 41.48025,0 c 2.44593,25.90187 6.12024,43.05579 11.02295,51.46179 l 2.09885,3.66897 c 12.2512,16.80149 30.80434,26.77768 55.65948,29.92859 l 0,-142.80166 c -32.55624,-9.80512 -54.60746,-18.90546 -66.15371,-27.30103 -24.85508,-17.84799 -37.28259,-43.22639 -37.28256,-76.13525 l 0,-0.5127 c -3e-5,-51.098309 24.50251,-84.001566 73.50769,-98.709868 9.10023,-2.798089 19.07642,-4.896933 29.92858,-6.296539 z m 0,191.619875 0,-125.994875 C 200.12694,84.97653 180.3508,100.54963 174.40147,127.14539 l -1.57013,15.74935 c -6e-5,31.49897 20.29945,52.67433 60.89859,63.52616 z m 30.97001,50.40436 0,138.07525 c 21.35144,-2.45664 37.45326,-8.93475 48.30551,-19.43435 14.69704,-13.99226 22.04567,-31.31707 22.0459,-51.97449 l 0,-0.52872 c -2.3e-4,-21.34082 -8.22471,-37.26106 -24.67347,-47.76077 -10.15797,-6.30173 -25.38393,-12.42737 -45.67794,-18.37692 z");
	this.p1.setAttribute('transform', 'scale(0.08) translate(250,250)');
	this.p1.setAttribute('fill', '#FFFFFF');
	
	/* orange circle
	this.p1.setAttribute('stroke-width', '10');
	this.p1.setAttribute('d',"m63.033,39.744c-4.274,17.143-21.637,27.576-38.782,23.301-17.138-4.274-27.571-21.638-23.295-38.78,4.272-17.145,21.635-27.579,38.775-23.305,17.144,4.274,27.576,21.64,23.302,38.784z");
	this.p1.setAttribute('fill', "#f7931a");
	*/
	
	/* bitcoin emblem
	this.p2.setAttribute('d','m46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-0.875-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653-3.509-0.875-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018-4.842-1.209-0.934,3.75s2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834,0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019,4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834,3.507,0.875,1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745,3.511,0.875,1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739,1.527-4.36-0.076-6.875-3.226-8.515,2.294-0.529,4.022-2.038,4.483-5.155zm-8.022,11.249c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729c2.38,0.594,10.012,1.77,8.878,6.317zm1.086-11.312c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.01c1.982,0.494,8.365,1.416,7.334,5.553z');
	this.p2.setAttribute('fill',"#FFFFFF");
	*/

/* STRAIGHT LINE
	//this.p2.setAttribute('d','m 40 25 v 30');
	//this.p2.setAttribute('fill', '#FFFFFF');
	//this.p2.setAttribute('stroke', '#FFFFFF');
	//this.p2.setAttribute('stroke-width', '5');
*/
	
	/*
	this.symbol.appendChild(this.p1);
	this.symbol.appendChild(this.p2);

	*/

	
	return this;
}

DollarEmblem.prototype.getSymbol = function(){
	return this.symbol;
};