
var canvas = document.getElementById( "gl-canvas" );
var gl;
var vPosition;
var vPositionCube;
var vPositionCone;
var vPositionN;

var vertices= get_vertices();
var faces=get_faces();
//deincrementing faces
for( var i=0; i<faces.length;i++){
	for(var j=0;j<3;j++){
		faces[i][j]=faces[i][j]-1;
	}
}

//init
window.onload = function init() {

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(1.0, 1.0, 1.0, 1.0 );

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

		nBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,nBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,flatten(normalVArray),gl.STATIC_DRAW);

		var vPositionN=gl.getAttribLocation(program,"vPositionN");
		gl.vertexAttribPointer(vPositionN,3,gl.FLOAT,false,0,0);
		gl.enableVertexAttribArray(vPositionN);

		fBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, faces.length*16, gl.STATIC_DRAW);

		cBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(cubeVertices),gl.STATIC_DRAW);

		var vPositionCube = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPositionCube, 3, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPositionCube );

		hBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,hBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(coneVertices),gl.STATIC_DRAW);

		var vPositionCone = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPositionCone, 3, gl.FLOAT, false, 0, 0 );

    render();
};

//general transformations=================================
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
var matrixTemp=mat4();
var cubematrixTemp;
var cubematrix= new Array(16);
var orbitRotationM= mat4();
var cubeRotationAngle=0;
var conematrixTemp=mat4();
var conePan=mat4();
var coneRotationAngle=0;
var conePanDirection=1;
var conePanRange=20; //how far left and right it goes
var nmatrixTemp=mat4();

var matrixTempView=view;
var matrixTempProj=persp;

var cubeTempView=view;
var cubeTempProj=persp;

var coneTempView=view;
var coneTempProj=persp;
var cubereflectiveM=mat4();
cubereflectiveM[0][0]=-1;
cubereflectiveM[2][2]=-1;
// console.log(cubereflectiveM);


//for rotating the cube
setInterval(function(){
	if(cuberotateOn==true){
		cubeRotationAngle+=0.81;
		// orbitRotationM[0][0]=Math.cos(cubeRotationAngle);
		// orbitRotationM[0][2]=Math.sin(cubeRotationAngle);
		// orbitRotationM[2][0]= -Math.sin(cubeRotationAngle);
		// orbitRotationM[2][2]=Math.cos(cubeRotationAngle);
		orbitRotationM=rotateY(cubeRotationAngle);
	}


},20);
// console.log(translate(0,0,0));

//for panning the cone
setInterval(function(){
	if(coneRotationAngle>conePanRange){
		conePanDirection= -1;
	}
	if (coneRotationAngle<-conePanRange){
		conePanDirection= 1;
	}

	if(conerotateOn==true ){
		coneRotationAngle+= conePanDirection*0.1;
		conePan=rotateZ(coneRotationAngle);
	}
},10);

//cone initiate
var conePositionRotate= rotateX(-26.56505118); //angle to make the cone point at (0,0,0) from (0,4,2)
var coneScale= scalem(0.4,0.4,0.4);
var coneTranslate= translate(0,(4-2+hexH),2);
var conematrix= mat4();


//render---------------------------------------
function render() {

	//matrix calculations
	matrixTemp=mult(xrotationM,yrotationM);
	matrixTemp=mult(ztranslationM,matrixTemp);
	matrixTemp=mult(view,matrixTemp);
	matrixTemp=mult(persp,matrixTemp);
	matrixTemp=mult(translationM,matrixTemp);

	// matrixTempView=mult(translationM,view)

	var rotationM=mult(xrotationM,yrotationM);
	//
	matrixTempView=mult(translationM,view);
	matrixTempProj=mult(translationM,persp)
	matrixTempView=mult(ztranslationM,matrixTempView);
	matrixTempProj=mult(ztranslationM,matrixTempProj);
	matrixTemp=(mult(matrixTempProj,mult(matrixTempView,mult(translationM,mult(ztranslationM,rotationM)))));
	// matrixTemp=(mult(matrixTempProj,mult(matrixTempView,mult(translationM,rotationM))));
	cubematrixTemp=mult(view,orbitRotationM);
	cubematrixTemp=mult(persp,cubematrixTemp);
	cubematrixTemp=mult(cubereflectiveM,cubematrixTemp);

	// cubeTempView=mult(orbitRotationM,view);
	// cubeTempProj=mult(orbitRotationM,persp);
	//
	// cubematrixTemp=mult(cubeTempProj,cubeTempView);

	// cubematrixTemp=mult(persp,view);
	// cubematrixTemp=mult(orbitRotationM,cubematrixTemp);
	// cubematrixTemp=orbitRotationM;

	//cone
	conematrixTemp=mult(coneScale,conePan);
	conematrixTemp=mult(coneTranslate,conematrixTemp);
	conematrixTemp=mult(conePositionRotate,conematrixTemp);
	conematrixTemp=mult(view,conematrixTemp);
	conematrixTemp=mult(persp,conematrixTemp);
	// conematrixTemp=mult(conePan,conematrixTemp);
	// cubematrixTemp=mat4();


	// Converting array to workable Array because the arrays generated beforehand doesn't allow you to apply it in
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			matrix[j+(i*4)]=matrixTemp[j][i];

		}
	}

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			conematrix[j+(i*4)]=conematrixTemp[j][i];

		}
	}

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			cubematrix[j+(i*4)]=cubematrixTemp[j][i];

		}
	}

	// Binding the vertex buffer\

  gl.clear( gl.COLOR_BUFFER_BIT );


	// hidden surface removal currently messing up everything
	gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// nmatrixTemp=mult(xrotationM,yrotationM);
	// nmatrixTemp=mult(ztranslationM,matrixTemp);
	// nmatrixTemp=mult(view,ztranslationM);
	// nmatrixTemp=mult(view,nmatrixTemp);
	// nmatrixTemp=mult(translationM,nmatrixTemp);
	normalM=mult(matrixTempView,mult(translationM,mult(ztranslationM,rotationM)));

	// normalM=normalMatrix(nmatrixTemp);
	// normalM=normalMatrix(view); //needs to be split up because this isn't workingview
	var normalMLocation= gl.getUniformLocation(program,'normalM');
	gl.uniformMatrix4fv(normalMLocation,false,flatten(normalM));

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
	// gl.bindBuffer(gl.ARRAY_BUFFER, fBuffer);
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
	gl.uniformMatrix4fv(matrixuniformLocationsCube,false,cubematrix);
	gl.drawArrays(gl.LINE_STRIP, 0, cubeVertices.length );

	gl.bindBuffer(gl.ARRAY_BUFFER,hBuffer);
	gl.vertexAttribPointer( vPositionCone, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPositionCone );
	var matrixuniformLocationsCone= gl.getUniformLocation(program, 'matrix')
	gl.uniformMatrix4fv(matrixuniformLocationsCone,false,conematrix);
	gl.drawArrays(gl.LINE_STRIP, 0, coneVertices.length );

	getLighting();
	lightPosition=mult(cubematrixTemp,lightPositionTemp);
	var positionUniformPositionLocation=gl.getUniformLocation(program,'lPosition');
	gl.uniform4fv(positionUniformPositionLocation,lightPosition);

  window.requestAnimationFrame(render);

}
