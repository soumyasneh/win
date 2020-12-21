//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameover, gameoverImg;
var restart, restartImg;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  
  g=displayWidth*10000/2;
  ground = createSprite(g,180,displayWidth*2000000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = 4;
  
  
  invisibleGround = createSprite(200,190,displayWidth*100,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameover=createSprite(trex.x,100);
  gameover.addImage("over",gameoverImg);
  gameover.scale=0.5;
  
  restart=createSprite(trex.x,150);
  restart.addImage("re",restartImg);
  restart.scale=0.5;
  
   gameover.visible=false;
    restart.visible=false;
   
  
  score = 0;
}

function draw() {
  background(180);
  
    text("Score: "+ score, trex.x,50);
    camera.position.x = trex.x;

  if(gameState===PLAY){
    trex.velocityX=4; 
    
  if(keyDown("space")) {
    //jumpSound.play();
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  score = score + Math.round(getFrameRate()/60);
  if(trex.x>=2400){
  trex.velocityX=0;
  trex.scale=0.8;
  trex.changeAnimation("collided", trex_collided);
  textSize(30);
  fill("rgb(182,102,210)");
  text("were born to win", trex.x,50);
  fill("rgb(0,51,102)");
  text("celebrate", trex.x,100);    
  }
if(obstaclesGroup.isTouching(trex)){ 
 // dieSound.play();
trex.scale=0.2; 
gameState=END;
}
//if(score>0 && score%100===0) {
 //checkPointSound.play(); 
 //console.log(trex.x);
//}
  }
  else if (gameState===END) {
   gameover.visible = true;
   gameover.x=trex.x;
   restart.visible = true;
   restart.x=trex.x; 
    //set velcity of each game object to 0
    trex.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     if(mousePressedOver(restart)){
        reset();
        }
           
           }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(Math.round(random(300,2000)),120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = 0;
    //console.log(cloud.x);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(random(300,2000)),165,10,40);
    obstacle.velocityX = 0;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  trex.scale=0.5;
  
}

