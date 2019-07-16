
var canvas = document.getElementById( "gl-canvas" );
var gl;
var vPosition;
var vPositionCube;

var color=[
	vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
	vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

function getColor( color, v ){
  var a = [];
  for(i = 0; i < v; i++){
    a.push(color);
  }
  return a;
}

var vertices= get_vertices();
var faces=get_faces();
//deincrementing faces
for( var i=0; i<faces.length;i++){
	for(var j=0;j<3;j++){
		faces[i][j]=faces[i][j]-1;
	}
}

//colouring
var colored=getColor(color[1],faces.length);
for(var i=0; i<vertices.length;i++){
	colored[i]=color[Math.floor(Math.random()*2)];
}

//init
window.onload = function init() {

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1.0 );

		program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

		vBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

		iBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(faces)),gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPosition );

		fBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, faces.length*16, gl.STATIC_DRAW);

		var vColor= gl.getAttribLocation( program, "vColor");
		gl.vertexAttribPointer(vColor,4,gl.FLOAT,false,0,0);
		gl.enableVertexAttribArray(vColor);

		gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colored));

		cBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(cubeVertices),gl.STATIC_DRAW);

		var vPositionCube = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPositionCube, 3, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPositionCube );


    render();
};

//transformations=================================




var view=lookAt(
	vec3(0,0,10),
	vec3(0,0,0),
	vec3(0,1,0)
);

var persp=perspective(
	70,
	canvas.width/canvas.height,
	0.1,
	1000
);
var matrix= new Array(16);
var modelViewCubeTemp;
var modelViewCube= new Array(16);

//render---------------------------------------
function render() {



	//matrix calculations
	var matrixTemp=mult(xrotationM,yrotationM);
	matrixTemp=mult(view,matrixTemp);
	matrixTemp=mult(persp,matrixTemp);
	matrixTemp=mult(translationM,matrixTemp);
	modelViewCubeTemp=mult(persp,view);
	modelViewCubeTemp=mult(translate(0.5,0,0),modelViewCubeTemp);
	// modelViewCubeTemp=mat4();

	// Converting array to workable Array because the arrays generated beforehand doesn't allow you to apply it in
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			matrix[j+(i*4)]=matrixTemp[j][i];

		}
	}

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			modelViewCube[j+(i*4)]=modelViewCubeTemp[j][i];

		}
	}

	// Binding the vertex buffer\

  gl.clear( gl.COLOR_BUFFER_BIT );


	// hidden surface removal currently messing up everything
	gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
	// gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colored));
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	// gl.enableVertexAttribArray( vPosition );
	var matrixuniformLocations= gl.getUniformLocation(program, 'matrix')
	gl.uniformMatrix4fv(matrixuniformLocations,false,matrix);
  gl.drawElements( gl.TRIANGLES, faces.length*3,gl.UNSIGNED_SHORT,faces);
	//
	gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
	gl.vertexAttribPointer( vPositionCube, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionCube );
	var matrixuniformLocationsCube= gl.getUniformLocation(program, 'matrix')
	gl.uniformMatrix4fv(matrixuniformLocationsCube,false,modelViewCube);
	gl.drawArrays(gl.LINE_STRIP, 0, cubeVertices.length );


  window.requestAnimationFrame(render);

}
