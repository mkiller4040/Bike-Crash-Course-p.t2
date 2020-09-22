var bikeManImg, parkImg, trashcanImg, fireHydrantImg, benchImg, shieldImg;
var bikeMan, trashcan, fireHydrant, bench, shield, ground;
var obstaclesGroup;
var invisGround;
var score = 0;
var PLAY = 1, END = 0, gameState = PLAY;

function preload()
{
  bikeManImg = loadAnimation("images/Bike1.png", "images/Bike2.png", "images/Bike3.png");
  parkImg = loadImage("images/Park.png");
  trashcanImg = loadImage("images/trashcan.png");
  shieldImg = loadImage("images/shield.png");
  benchImg = loadImage("images/Bench.png");
  fireHydrantImg = loadImage("images/fireHydrant.png");
}

function setup() 
{
  createCanvas(displayWidth,displayHeight);

  bikeMan = createSprite(40, displayHeight - 300, 50, 50);
  bikeMan.addAnimation("bikeMan", bikeManImg);
  bikeMan.scale = 1.25;

  ground = createSprite(40, displayHeight - 260, displayWidth*2, 10);
  ground.x = ground.width/4;

  invisGround = createSprite(40, displayHeight - 250, displayWidth*2, 10);
  invisGround.visible = false;

  obstaclesGroup = new Group();
}

function draw() 
{
  background(parkImg);  

  score = score + 0.1
  fill("black");
  textSize(36);
  text ("Distance Travelled:" + Math.round(score), displayWidth - 380, displayHeight/3 - 100);
  
  if(gameState === PLAY)
  {
    bikeMan.collide(invisGround);

  if(keyDown("space") && bikeMan.y > 412)
  {
    bikeMan.velocityY = -14.5
  }

  bikeMan.velocityY = bikeMan.velocityY + 1;

  ground.velocityX = -10;

  if(ground.x < 0)
  {
    ground.x = ground.width/4;
  }

  spawnObstacles();

  obstaclesGroup.collide(invisGround);
  }

  drawSprites();
}

function spawnObstacles() 
{
  if(frameCount % 100 === 0) 
  {
    var obstacle = createSprite(1200,displayHeight/2 + 60,10,40);
    //obstacle.velocityX = -(6 + score/100*3);
    obstacle.velocityX = -8;
    
    var rand = Math.round(random(1,3));

    obstacle.scale = 0.75;
              
    switch(rand)
    {
      case 1: obstacle.addImage("obstacle1", benchImg);
      //obstacle.setCollider("rectangle", 0, 0, 140, 60);
      obstacle.y = displayHeight/2 + 75;
      break;
        
      case 2: obstacle.addImage("obstacle2", fireHydrantImg); 
      obstacle.scale = 0.15;
      obstacle.y = displayHeight/2 + 70;
      break;
      
      case 3: obstacle.addImage("obstacle3", trashcanImg);
      obstacle.y = displayHeight/2 + 70; 
      break;
      
      default: break;
    }
    
    obstacle.lifetime = 150;
    obstaclesGroup.add(obstacle);
  }
}

