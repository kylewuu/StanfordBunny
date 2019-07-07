
var canvas;
var gl;
var color;


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

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


var redBoxesFirstRow = [
	vec2 (0.2, 0.2),
	vec2 (0.4, 0.5),
	vec2 (0.3, 0.2),

];



var bunnyVertices = get_vertices();
for(var i=0;i<bunnyVertices.length;i++){
	bunnyVertices[i]
}


//render---------------------------------------
function render() {

	// Binding the vertex buffer\
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.clear( gl.COLOR_BUFFER_BIT );


	//actual drawing
	gl.bufferData( gl.ARRAY_BUFFER, flatten(bunnyVertices), gl.STATIC_DRAW );
  // color=vec4(1,0,0,1);
  // colorLoc=gl.getUniformLocation(program,"color");
  // gl.uniform4fv(colorLoc,color);
  gl.drawArrays( gl.TRIANGLES, 0, bunnyVertices.length );




  window.requestAnimationFrame(render);

}
