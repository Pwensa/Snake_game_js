var s;
var scl = 20;
var food;

function setup() {
  createCanvas(400, 400);
  s = new Snake();

  pickLocation();
}



function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);


  food = createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scl);

}

function draw() { 



  if(s.eat(food)){
    pickLocation();
  }

  frameRate(7);
  background(0);
  s.death();
  s.update();
  s.show();

  fill(255,0,100);
  rect(food.x,food.y, scl, scl);


}


function keyPressed(){


  if( keyCode === UP_ARROW){
    s.dir(0, -1);

  }else if(keyCode === DOWN_ARROW){
    s.dir(0,1);
  }else if(keyCode === RIGHT_ARROW){
    s.dir(1,0);
  }else if(keyCode === LEFT_ARROW){
    s.dir(-1,0);
  }
}



function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;

  this.counter = 0; 
  this.tail = [];

  this.eat = function(food){

    if(s.x === food.x && s.y === food.y){
      this.counter++;
      return true;
    }else{
      return false;
    }
  }



  this.dir = function(x,y){
    this.xspeed = x;
    this.yspeed = y;
  }


  this.death = function(){
    for(var i = 0; i < this.tail.length; i++){
      var pos = this.tail[i];
      var d  = dist(this.x, this.y, pos.x,pos.y);
      if(d< 1){
        console.log("Starting over"); 
        this.counter = 0;
        this.tail = []; 
      }
    }
  }

  this.update = function () {
    if(this.counter === this.tail.length){
      for(var  i = 0;i<this.tail.length - 1 ; i++){
        this.tail[i] = this.tail[i + 1];
  
      }
  
    }
    this.tail[this.counter - 1] = createVector(this.x,this.y);



    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;



    this.x = constrain(this.x, 0,width - scl);
    this.y = constrain(this.y, 0,height - scl);


  }


  this.show = function () {
    fill(300);

    for(var i = 0; i < this.counter; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);

    }
    fill(300);
    rect(this.x, this.y, scl, scl);

  }

  
  
}