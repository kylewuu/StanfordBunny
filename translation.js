//translations-------

var leftmousedown=false;
var rightmousedown= false;
var leftmouseX;
var leftmouseY;
var rightmouseX;
var rightmouseY;
var xTranslationTemp=0;
var yTranslationTemp=0;
var translationM=mat4();
var translationHolder=mat4();
var xrotationM=mat4();
var xrotationHolder=mat4();
var yrotationM=mat4();
var yrotationHolder=mat4();

var ztranslationM=mat4();
var ztranslationHolder=mat4();

var yAngle=0;
var xAngle=0;
var yAngleTemp=0;
var xAngleTemp=0;
var translationSpeed=1000;
var rotationSpeed=10;
var translationScale=1;


window.addEventListener("mousemove",mouseMove);
function mouseMove(event){
	if(leftmousedown==false){
		leftmouseX=event.clientX;
		leftmouseY=event.clientY;
	}
	if(rightmousedown==false){
		rightmouseX=event.clientX;
		rightmouseY=event.clientY;
	}
}

window.onmousedown=function(e,obj){
	e = e || window.event; //detecting for if it's left or right click
	if (e.keycode||e.which==1){ //if left click
		leftmousedown=true;
		if(leftmousedown==true){
			window.addEventListener("mousemove",mouseMove);
			function mouseMove(event){
				if(leftmousedown==true){
					translationHolder[0][3]= xTranslationTemp+(event.clientX-leftmouseX)/(translationSpeed*translationScale);
					translationHolder[1][3]= yTranslationTemp-(event.clientY-leftmouseY)/((translationSpeed*(canvas.height/canvas.width))*translationScale); //this is divided by it the inverse of the aspect ratio so y-axis translation isn't too slow
					translationM=translationHolder;
				}

			}
		}
	}
	if (e.keycode|| e.which==3){ //if right click
		rightmousedown=true;
		if(rightmousedown==true){
			window.addEventListener("mousemove",mouseMove);
			function mouseMove(event){
				if(rightmousedown==true){
					xAngle= xAngleTemp+ ((event.clientY-rightmouseY)*Math.PI/180)/rotationSpeed;
					xrotationHolder[1][1]= Math.cos(xAngle);
					xrotationHolder[1][2]= -Math.sin(xAngle);
					xrotationHolder[2][1]= Math.sin(xAngle);
					xrotationHolder[2][2]= Math.cos(xAngle);
					xrotationM=xrotationHolder;

					yAngle= yAngleTemp+ ((event.clientX-rightmouseX)*Math.PI/180)/rotationSpeed;
					yrotationHolder[0][0]= Math.cos(yAngle);
					yrotationHolder[0][2]= Math.sin(yAngle);
					yrotationHolder[2][0]= -Math.sin(yAngle);
					yrotationHolder[2][2]= Math.cos(yAngle);
					yrotationM=yrotationHolder;


				}
			}
		}
	}
}

window.onmouseup=function(e,obj){
	e = e || window.event; //detecting for if it's left or right click
	if (e.keycode||e.which==1){
		leftmousedown=false;
		window.addEventListener("mousemove",mouseMove);
		function mouseMove(event){
			if(leftmousedown==false){
				leftmouseX=event.clientX;
				leftmouseY=event.clientY;
				xTranslationTemp= translationM[0][3];
				yTranslationTemp= translationM[1][3];
				translationHolder=translationM
			}
		}
	}
	if (e.keycode||e.which==3){
		rightmousedown=false;
		window.addEventListener("mousemove",mouseMove);
		function mouseMove(event){
			if(rightmousedown==false){
				rightmouseX=event.clientX;
				rightmouseY=event.clientY;

				xAngleTemp=xAngle;
				yAngleTemp=yAngle;

				xrotationHolder=xrotationM;

			}
		}
	}
}


window.addEventListener("keydown", keyDown, false); //for detecting keydown
function keyDown(key) {
  if (key.key == "ArrowUp"){ //it's easier and makes more sense to use A as left and D as right
    ztranslationHolder[2][3]+=translationSpeed/500;
		ztranslationM=ztranslationHolder;
		translationScale+=0.001;
  }
	if (key.key == "ArrowDown"){ //it's easier and makes more sense to use A as left and D as right
    ztranslationHolder[2][3]-=translationSpeed/500;
		ztranslationM=ztranslationHolder;
		if(translationScale>0.2){
			translationScale-=0.001;
		}

  }

}

window.onwheel=function(e){
	if (e.wheelDelta>0){ //it's easier and makes more sense to use A as left and D as right
    ztranslationHolder[2][3]+=translationSpeed/5000;
		ztranslationM=ztranslationHolder;
		translationScale+=0.1;
  }
	if (e.wheelDelta < 0){ //it's easier and makes more sense to use A as left and D as right
    ztranslationHolder[2][3]-=translationSpeed/5000;
		ztranslationM=ztranslationHolder;
		if(translationScale>0.2){
			translationScale-=0.1;
		}

  }

}


window.addEventListener("keypress", keyPress, false);
function keyPress(key) {
	if(key.key=="r"){
		leftmousedown=false;
		rightmousedown= false;
		leftmouseX;
		leftmouseY;
		rightmouseX;
		rightmouseY;
		xTranslationTemp=0;
		yTranslationTemp=0;
		translationM=mat4();
		translationHolder=mat4();
		xrotationM=mat4();
		xrotationHolder=mat4();
		yrotationM=mat4();
		yrotationHolder=mat4();
		ztranslationM=mat4();
		ztranslationHolder=mat4();

		yAngle=0;
		xAngle=0;
		yAngleTemp=0;
		xAngleTemp=0;
		translationSpeed=100;
		rotationSpeed=10;
		translationScale=1;
	}
}
