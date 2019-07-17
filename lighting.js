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


var lightPosition = vec4(5.0, 5.0, 0.0, 0.0);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
