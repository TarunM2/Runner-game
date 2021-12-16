var PLAY = 1;
var END = 0;
var gameState = PLAY;



var backgroundImg, obstacleImg,  playerImg
var player,invisibleGround
var restartImg, gameOverImg
function preload(){
backgroundImg=loadImage("images/background.jpg")
obstacleImg=loadImage("images/obstacle1.png")
playerImg=loadImage("images/Player.png")
restartImg=loadImage("images/restart.png")
gameOverImg=loadImage("images/gameover.png")
}

function setup() {
    createCanvas(600, 200);
  
    player = createSprite(50,180,20,50);
    player.addImage(playerImg)
    player.scale = 0.2;
    
    
    
      gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.2;
    restart.scale = 0.2;
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    //create Obstacle and Cloud 
  
    obstaclesGroup = createGroup();
    
    
    
    
    
    
    score = 0;
}

function draw() {
    background(backgroundImg);
    //displaying score
    text("Score: "+ score, 500,50);
    
      
  
    
    if(gameState === PLAY){
       gameOver.visible = false
      restart.visible = false
     
      //scoring
      score = score + Math.round(frameCount/60);
      
     
      
      //jump when the space key is pressed
      if(keyDown("space")&& player.y >= 100) {
          player.velocityY = -13;
      }
      
      //add gravity
      player.velocityY = player.velocityY + 0.8
    
      
    
      //spawn obstacles on the ground
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(player)){
          gameState = END;
      }
    }
     else if (gameState === END) {
        
        gameOver.visible = true;
      restart.visible = true;
       obstaclesGroup.setVelocityXEach(0);
       
     }
    
   
    //stop trex from falling down
    player.collide(invisibleGround);
    
    
    
    drawSprites();
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,165,10,40);
      obstacle.velocityX = -6;
      obstacle.addImage(obstacleImg)
       obstacle.scale=0.1
      
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }