//wireframe
var cubeVertices = [
    vec3(5, 5, 0),
		vec3(5.5, 5, 0),
		vec3(5.5, 5.5, 0),
		vec3(5, 5.5, 0),
		vec3(5, 5.5, 0),
		vec3(5, 5, 0),
		vec3(5, 5, 0.5),
		vec3(5.5, 5, 0.5),
		vec3(5.5, 5, 0),
		vec3(5.5, 5, 0.5),
		vec3(5.5, 5.5, 0.5),
		vec3(5.5, 5.5, 0),
		vec3(5.5, 5.5, 0.5),
		vec3(5, 5.5, 0.5),
		vec3(5, 5.5, 0),
		vec3(5, 5.5, 0.5),
		vec3(5, 5, 0.5)
  ];

	//drawing the cone
	var hexagonVal= 0.866025; //result of the calculation for the hex on the bottom
	var hexH= 3.232049391;
	var coneVertices=[
		vec3(0,2,1),
		vec3(0,2+hexH,0),
		vec3(0,2,1),

		vec3(hexagonVal,2,0.5),
		vec3(0,2+hexH,0),
		vec3(hexagonVal,2,0.5),

		vec3(hexagonVal,2,-0.5),
		vec3(0,2+hexH,0),
		vec3(hexagonVal,2,-0.5),

		vec3(0,2,-1),
		vec3(0,2+hexH,0),
		vec3(0,2,-1),

		vec3(-hexagonVal,2,-0.5),
		vec3(0,2+hexH,0),
		vec3(-hexagonVal,2,-0.5),

		vec3(-hexagonVal,2,0.5),
		vec3(0,2+hexH,0),
		vec3(-hexagonVal,2,0.5),

		vec3(0,2,1),

	]
