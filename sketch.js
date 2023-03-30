// points is a data structure which holds x,y coordinate and other useful stuff

var points=[]; 
var sym = true;
var numsym=2;
screenw = screen.width;
screenh = screen.height;
offx1=0;
offx2=10000;
colorX = 255;
colorY = 204;
lastX =255;
lastY = 204;
colorZ = 100;
var swiggle = 100;

function setup() { 
  createCanvas(screenw, screenh);
  strokeWeight(2);
  noFill();
  colorMode(HSB);

 
  points = [];
} 

// redraw the drawing
function draw() { 
  offx1 +=1;
  offx2 +=1;
  // clear the background
  background(255);
  if(document.getElementById("flexSwitchCheckDefault").checked === true){
    sym=true;
  }
  else{
    sym=false;
  }
  swiggle = 2*document.getElementById('customRange1').value ;
  
  // draw all the points
  // in both symmetries. (dimensions)
  for(let dim =1;dim<=numsym; dim++){
    
    
    beginShape();
    
    var end=false;
    for(var i in points) {
      
      
      // grab the point by index
      var one_point = points[i];
      if(one_point.dim!=dim){
        continue;
      }
      stroke(one_point.colorX,colorY,colorZ);
    
      
      if(end){
        beginShape();
        end=false;
      }
    
      curveVertex(one_point.x, one_point.y);
      
      if(one_point.released){
        endShape();
        end = true;
      }
    }
    endShape();
  }
}


function mouseReleased(){
  if(mouseX<140)return;
  // create an object as empty point
  var one_point = {};
  one_point.x = mouseX+swiggle*(noise(offx1)-0.5);
  one_point.y = mouseY+swiggle*(noise(offx2)-0.5);
  one_point.released = true;
  one_point.dim=1;
  one_point.colorX = (lastX + 10*(noise(offx1)-0.5))%255;
  one_point.colorY = (lastY + 10*(noise(offx2)-0.5))%255;
  lastX = one_point.colorX;
  lastY = one_point.colorY;
  
  
  // add the point to the array
  points.push(one_point);
  if(sym){

    //create symmetric point
    points.push(sympoint(one_point));
  }
}
// save the drawing 
function mouseDragged(){
  // create an object as empty point
  if(mouseX<140)return;
  var one_point = {};
  one_point.x = mouseX + swiggle*(noise(offx1)-0.5);
  one_point.y = mouseY + swiggle*(noise(offx2)-0.5);
  one_point.released = false;
  one_point.dim=1;
  one_point.colorX = (lastX + 10*(noise(offx1)-0.5)%255);
  one_point.colorY = (lastY + 10*(noise(offx2)-0.5))%255;
  lastX = one_point.colorX;
  lastY = one_point.colorY;
  
  // add the point to the array
  points.push(one_point);
  
  if(sym){
    //create symmetric point
    points.push(sympoint(one_point));
  }
}

function sympoint(point){
  var new_point = {};
  new_point.x = screenw - point.x;
  new_point.y = point.y;
  new_point.released = point.released;
  new_point.dim = 2;
  new_point.colorX = point.colorX;
  new_point.colorY = point.colorY;
  
  
  return new_point;
}

function keyPressed() {
	if(key === 's' || key ==='S'){
    saveJSON(points, "drawings.json");
  }
}
function clearCanvas() {
  points = [];
}