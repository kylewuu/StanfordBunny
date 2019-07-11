
var canvas;
var gl;
var color;

function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}


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

var vertices = get_vertices();

var view=lookAt(
  vec3(0,0,0),
  vec3(0,0,0),
  vec3(0,10,0)
);

var persp=perspective(
  60,
  1,
  0.1,
  1000
);

var viewProjection=mult(persp,view);
finalTran=mult(viewProjection,vec4(vertices,1.0));




//render---------------------------------------
function render() {

	// Binding the vertex buffer\
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.clear( gl.COLOR_BUFFER_BIT );


	//actual drawing
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

  // m=gl.getUniformLocation(program,"vertices");
  // gl.uniformMatrix4fv(vertices,false,finalTran);
  gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

  window.requestAnimationFrame(render);

}
