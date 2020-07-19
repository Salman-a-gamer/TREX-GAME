var trex, trexRunning, ground, groundRunning, invisibleGround, cloud, cloudImage, obstacle, obs1, obs2, obs3, obs4, obs5, obs6, obstaclesGroup, cloudGroup, gameState, PLAY = 1,
  END = 0, trexcollided, restart, gameover, count=0,
    jump, die, checkpoint;

gameState = PLAY;

function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundRunning = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  restartIMG = loadImage("restart.png");
  gameoverIMG = loadImage("gameOver.png");
  trexcollided = loadImage("trex_collided.png");
  jump = loadSound("jump.mp3");
  //checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(30, 175, 20, 50);
  trex.addAnimation("trex", trexRunning);
  trex.addAnimation("trexcollided", trexcollided);
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 10);
  ground.addImage("ground", groundRunning);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = false;

  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  
  gameover = createSprite(300,100,100,20);
  gameover.addImage(gameoverIMG);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(300,130,50,50);
  restart.addImage(restartIMG);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
 
  //set background to white
  background(180);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6+3*count/100);
     //scoring
  count = count + Math.round(getFrameRate()/60);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && trex.y >= 159){
    trex.velocityY = -12 ;
   jump.play();
  }
    //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
   //spawn the clouds
  spawnClouds();
  
  //spawn obstacles
  spawnObstacles();
  
  if(count%100==0 && count>0){
     
  }
  
  if (ObstaclesGroup.isTouching(trex)) {
    gameState = END;
   die.play();
  }

  }else if(gameState === END) {
    ground.velocityX = 0;
  ObstaclesGroup.setVelocityXEach(0);
  CloudsGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
  CloudsGroup.setLifetimeEach(-1);
  trex.changeAnimation("trexcollided",trexcollided);
  gameover.visible = true;
  restart.visible = true;
  trex.velocityY = 0;
    
  }
  
  if(mousePressedOver(restart)){
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex",trexRunning);
  count = 0;
  }

  text("Score: "+ count, 500, 50);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
 
  drawSprites();
}

function spawnClouds() {
  if (World.frameCount % 60 == 0) {
    cloud = createSprite(600, random(70, 120), 40, 30)
    cloud.addImage(cloudImage);
    cloud.scale = 0.8;
    cloud.velocityX = -5;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (World.frameCount % 50 == 0) {
    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -5;
    obstacle.lifetime = 125;
    obstacle.scale = 0.5;
    ObstaclesGroup.add(obstacle);
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obs1);
        break;
      case 2:
        obstacle.addImage(obs2);
        break;
      case 3:
        obstacle.addImage(obs3);
        break;
      case 4:
        obstacle.addImage(obs4);
        break;
      case 5:
        obstacle.addImage(obs5);
        break;
      case 6:
        obstacle.addImage(obs6);
        break;
      default:
        break;
    }
  }
}