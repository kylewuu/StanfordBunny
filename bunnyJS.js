
var canvas;
var gl;
var color;
canvas = document.getElementById( "gl-canvas" );

window.onload = function init() {

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );


    gl.clearColor( 0, 0, 0, 1.0 );
		vBuffer = gl.createBuffer();

    //
    //  Load shaders and initialize attribute buffers
    //

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );



    render();
};

// var vertices = get_vertices();
// var vertices= [
// 	vec3(-0.5,0.5,-0.5),
// 	vec3(-0.5,0.5,-0.5),
// 	vec3(-0.5,-0.5,-0.5)
// ];

var vertices= get_vertices();

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

var matrixTemp=mult(persp,view);

// Converting array to workable Array
var matrix= new Array(16);
for(var i=0;i<4;i++){
	for(var j=0;j<4;j++){
		matrix[j+(i*4)]=matrixTemp[j][i];

	}
}



//render---------------------------------------
function render() {

	// Binding the vertex buffer\
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.clear( gl.COLOR_BUFFER_BIT );


	//actual drawing
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	const uniformLocations={
		matrix: gl.getUniformLocation(program, 'matrix'),
	};


	gl.uniformMatrix4fv(uniformLocations.matrix,false,matrix);
  gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

  window.requestAnimationFrame(render);

}
