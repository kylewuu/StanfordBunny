//calculating normals
var verticesTemp=get_vertices();
var normalVArray= new Array(verticesTemp.length);
for(var i=0;i<verticesTemp.length;i++){
  normalVArray[i]=vec3(0.0,0.0,0.0);
}
// var normalVArray = get_vertices();
// for(i = 0; i < normalVArray.length)
var vertexIndexA;
var vertexIndexB;
var vertexIndexC;

var verticeA;
var verticeB;
var verticeC;

var normalResult;

var facesTemp=get_faces();
for( var i=0; i<facesTemp.length;i++){
	for(var j=0;j<3;j++){
		facesTemp[i][j]=facesTemp[i][j]-1;
	}
}

for( var i=0; i<facesTemp.length;i++){
  vertexIndexA= facesTemp[i][0];
  vertexIndexB= facesTemp[i][1];
  vertexIndexC= facesTemp[i][2];

  //selecting the vertices
  verticeA=verticesTemp[vertexIndexA];
  verticeB=verticesTemp[vertexIndexB];
  verticeC=verticesTemp[vertexIndexC];

  //cross product of the two edges
  // console.log(i);
  normalResult=cross(subtract(verticeB,verticeA),subtract(verticeC,verticeA));

  //add because there is overlap
  normalVArray[vertexIndexA]=add(normalResult,normalVArray[vertexIndexA]);
  normalVArray[vertexIndexB]=add(normalResult,normalVArray[vertexIndexB]);
  normalVArray[vertexIndexC]=add(normalResult,normalVArray[vertexIndexC]);

}

//these values were tested randomly until it looked right
var lightPositionTemp = vec4(5, 5, 0, 0.0);
var lightAmbient = vec4(0.050, 0.023, 0, 1.0);
var lightDiffuse = vec4(1, 0.717, 0,1);
var lightSpecular = vec4(1, 0.823, 0.290, 1.0);
//reflection coefficients
var ka=0.2; //ambient
var kd=0.8; //diffuse
var ks=1.0; //specular
var shininessLvl=4;

//loading lighting into render-- there's too much so it's just gonna get put into a function to keep things neat and readable
function getLighting(){
	// var positionUniformPositionLocation=gl.getUniformLocation(program,'lPosition');
	// gl.uniform4fv(positionUniformPositionLocation,lightPosition);
	var ambientUniformPositionLocation= gl.getUniformLocation(program,'ambientColour');
	gl.uniform4fv(ambientUniformPositionLocation,lightAmbient);
	var diffuseUniformPositionLocation= gl.getUniformLocation(program,'diffuseColour');
	gl.uniform4fv(diffuseUniformPositionLocation,lightDiffuse);
	var specularUniformPositionLocation= gl.getUniformLocation(program,'specularColour');
	gl.uniform4fv(specularUniformPositionLocation,lightSpecular);

	var kaUniformLocation= gl.getUniformLocation(program, 'ka');
	gl.uniform1f(kaUniformLocation,ka);
	var kdUniformLocation= gl.getUniformLocation(program, 'kd');
	gl.uniform1f(kdUniformLocation,kd);
	var ksUniformLocation= gl.getUniformLocation(program, 'ks');
	gl.uniform1f(ksUniformLocation,ks);
	var shininessLocation= gl.getUniformLocation(program,'shininessLvl')
	gl.uniform1f(shininessLocation,shininessLvl);
}
