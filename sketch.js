//creating objects
var mario, marioImage;
var backgroundImage;
var button, buttonImage;
var startlogo, startlogoImage;
var startmusic;
var START = 1;
var END = 2;
var STORY = 0;
var gameState = STORY;
var story = 1;
var pressStartGroup, startButtonGroup;
var flyingBlock;
var life = 3;
var score = 0;
var coin_score=0;
var backgroundG;
var coin_image;
var coin1
var skip_img
var isPaused = false
//loading the images & the animations
function preload(){
  marioImage = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png");
  marioJump = loadAnimation("mario_jump.png");
  backgroundImage = loadImage("background.jpg");
  buttonImage = loadImage("play.png");
  startlogoImage = loadImage("logo.png");
  startmusic = loadSound("start_music.mp3");
  pressStartImage = loadAnimation("start.png","start1.png");
  startButtonImage = loadImage("start_button.png");
  gameBackgroundImage = loadImage("mario background.png");
  mushroomImage = loadAnimation("mushroom1.png","mushroom2.png","mushroom3.png","mushroom4.png","mushroom5.png","mushroom6.png","mushroom7.png","mushroom8.png");
  turtleImage = loadImage("turtle1.png");
  heartImage = loadImage("heart.png");
  flyingBlockImage = loadImage("block1.png");
  loseSound = loadSound("mario_lose.mp3");
  livelost = loadSound("livelost.mp3");
 coin_image=loadAnimation("1coin.png","2coin.png","3coin.png","4coin.png","5coin.png","6coin.png","7coin.png","8coin.png")
 skip_img=loadImage("skip_2.png")
 restartimg = loadImage("restart.jpg")
 pauseimg=  loadImage("pause.jpg")
}

//creating the canvas & the objects
function setup() {
  createCanvas(windowWidth, windowHeight);
  gameBackground = createSprite(200,200,20,20)
  gameBackground.addImage(gameBackgroundImage)
  gameBackground.visible= false

  button = createSprite(width - 120,height - 100);
  button.addImage(buttonImage);
  
  pressStart = createSprite(windowWidth/2,windowHeight/2);
  pressStart.addAnimation("blink",pressStartImage);
  pressStart.scale = 0.5;

  coin1= createSprite(windowWidth - 220,windowHeight/8 - 35,10,10)
  coin1.addAnimation("coin",coin_image)
  coin1.scale=0.9
  coin1.visible=false;

  pause = createSprite(windowWidth - 320,windowHeight/8 - 35,20,20)
  pause.visible = false
  pause.addImage(pauseimg)
  pause.scale = 0.03

  restart = createSprite(windowWidth - 420,windowHeight/8 - 35,20,20)
  restart.visible = false
  restart.addImage(restartimg)
  restart.scale = 0.1

  skip_intro=createSprite(width - 355,height - 70)
  skip_intro.addImage(skip_img)
  skip_intro.visible=false; 

  mario = createSprite(windowWidth/4-150,windowHeight - 150);
  mario.addAnimation("mario",marioImage);
  mario.addAnimation("jump",marioJump)
  mario.scale = 0.5;
   


  heart1 = createSprite(windowWidth/8 - 55,windowHeight/8 - 35);
  heart1.addImage(heartImage);
  heart1.scale = 0.05;

  heart2 = createSprite(windowWidth/8 ,windowHeight/8 - 35);
  heart2.addImage(heartImage);
  heart2.scale = 0.05;

  heart3 = createSprite(windowWidth/8+55 ,windowHeight/8 - 35);
  heart3.addImage(heartImage);
  heart3.scale = 0.05;


  // heart4 = createSprite(windowWidth/8+110 ,windowHeight/8 - 35);
  // heart4.addImage(heartImage);
  // heart4.scale = 0.05;

  // heart5 = createSprite(windowWidth/8+165 ,windowHeight/8 - 35);
  // heart5.addImage(heartImage);
  // heart5.scale = 0.05;

  pressStartGroup = new Group();
  startButtonGroup = new Group();
  block = new Group();
  mushroomG = new Group();
  turtleG = new Group();
  backgroundG = new Group();
  coinG= new Group();
}

//creating draw function for giving functions & statements to the objects
function draw() {
  //clearing the screen
  background("black");
  if(gameState===STORY){
    if(mousePressedOver(skip_intro)){
      gameState = START;
      pressStartGroup.destroyEach();
      startButtonGroup.destroyEach();
      startlogo.destroy();
     background("black");
      frameRate = 1;
      spawnB();
      } 
  }
  if (gameState === START){
    if(mousePressedOver(pause)){
      isPaused = true
    }
  }
  if (gameState === START){
    if(mousePressedOver(restart)){
      isPaused = false
      turtleG.destroyEach()
      coinG.destroyEach()
      mushroomG.destroyEach()
      block.destroyEach()
    }
  }
  if(gameState === START && isPaused === true){
    stop()
  }


  if(gameState === STORY && story === 1){  
    pressStart.visible = false;
  
   if(mousePressedOver(button)){

      background("black");

      story = 2;
      startlogo = createSprite(windowWidth/2,windowHeight/2);
      startlogo.addImage(startlogoImage);
      startlogo.scale = 1.2;
      skip_intro.visible=true;
     
      startmusic.play();
      startmusic.loop();
      button.destroy();

  }
   
    background(backgroundImage);
 
}
  
if(story === 6){

}else{
    //pressStartGroup.destroyEach();
}
  
if(gameState === START ){


  
    mario.visible = true;
    heart1.visible = true;
    heart2.visible=true;
    heart3.visible = true;
    coin1.visible=true;
    skip_intro.visible=false;
    pause.visible = true
    restart.visible = true
   spawnEnemies();
  
  
   end();
   fill("red")
   textSize(20)
   text("Press Down_ARROW to Reload",  width-1000,80)
  
  if(frameCount % 200 === 0 ){
    
  flyingBlock = createSprite(windowWidth + 180,Math.round(random((windowHeight - 210),(windowHeight - 410))));
  flyingBlock.addImage(flyingBlockImage);
  flyingBlock.scale = 0.4;
  flyingBlock.velocityX = -(6 + score/100);
  flyingBlock.lifetime = windowWidth+50;
  flyingBlock.depth = 6;
  block.add(flyingBlock);
    
  flyingBlock.setCollider("rectangle",0,90,780,125);

}
  
gameBackground.visible= true
gameBackground.depth = 1;
  
 gameBackground.velocityX = -(6 + score/100);
  backgroundG.add(gameBackground);
  
  if(gameBackground.x < windowWidth / 2){
    spawnB();
    gameBackground.x = (windowWidth + gameBackground.width/2) - 20;
  }
  
  var invisibleline = createSprite(windowWidth/4 - 80, windowHeight - 102,windowWidth/4, windowHeight/50);
  invisibleline.visible = false; 
  
  if(mario.collide(invisibleline) ){
    if(keyDown("space")){
    mario.velocityY = -30
    mario.velocityY= mario.velocityY+1
    mario.changeAnimation("jump",marioJump);
    mario.scale = 0.2; 
    
    setTimeout(function(){
       mario.scale = 0.5;
       mario.changeAnimation("mario",marioImage);
     },1200);
      
    }
   }
  
  if(mario.isTouching(block)){
    mario.bounceOff(block);
  }
  
  if(mario.x < windowWidth/4 - 100){
    mario.x = windowWidth/4 - 100
  }
  mario.velocityY += 0.8;
  mario.collide(invisibleline);
  
  }
  
  if(gameState === END){
    mario.visible = false;
    pause.visible = false
    restart.visible = false
    backgroundG.destroyEach();
    startmusic.stop();
    coin1.visible=false;
    mushroomG.destroyEach();
    turtleG.destroyEach();
    block.destroyEach();
    coinG.destroyEach();
    //loseSound.play();
    background("black");
    textSize(25);
    textFont("orbitron");
    textStyle("bold");
    textAlign(CENTER);
    fill("blue");
    text("YOU LOSE",windowWidth/2,windowHeight/2);
    text("PRESS 'R' TO RESTART",windowWidth/2,windowHeight/2 + 50);
    //loseSound.stop()
    if(keyDown("r")){
   
      gameState = START;
      spawnB();
      life = 3;
      frameRate = 1;
      score = 0;
      coin_score=0;
      startmusic.play();
      startmusic.loop();
      
      mario = createSprite(windowWidth/4-100,windowHeight - 150);
      mario.addAnimation("mario",marioImage);
      mario.addAnimation("jump",marioJump);
      mario.scale = 0.5;
      
      heart1 = createSprite(windowWidth/8 - 55,windowHeight/8 - 35);
      heart1.addImage(heartImage);
      heart1.scale = 0.05;
      heart2 = createSprite(windowWidth/8 - 0,windowHeight/8 - 35);
      heart2.addImage(heartImage);
      heart2.scale = 0.05;
      heart3 = createSprite(windowWidth/8 + 55,windowHeight/8 - 35);
      heart3.addImage(heartImage);
      heart3.scale = 0.05;
    }
  }

  //drawing the sprites
  drawSprites();

  if(gameState === START){
        
    textSize(20);
    textFont("orbitron");
    textStyle("bold");
    fill("red");
    text("Score:"+score,windowWidth - 120,windowHeight/8 - 30);
    score = score + Math.round( getFrameRate()/60);
    text("Coin:"+coin_score,windowWidth - 200,windowHeight/8 - 30);
    
      for(i=0;i<coinG.length;i++){
        if(coinG.get(i).isTouching(mario)){
           coinG.get(i).remove()
           coin_score=coin_score+1
        }
      
      }
    
    
  }
 
  //applying function to change the gameState story to different parts
  gameStateChange();
  
}

//creating sunction to change story to differen parts
function gameStateChange(){
  
if(gameState === STORY){
 
 // skipintro.visible= true
  mario.visible = false;
  heart1.visible = false;
  heart2.visible=false;
  heart3.visible=false;
  if(story === 2){
    
    setTimeout(function(){
        story = 3;
      },500);//2500

    }
      textSize(25);
      textFont("orbitron");
      textStyle("bold");
      textAlign(CENTER);
      fill("blue");  

    if(story === 3){

    text("A MONSTER HAS KIDNAPPED THE PRINCESS PEACH",windowWidth/2,windowHeight/2 - 30);

      setTimeout(function(){
        story = 4;
      },500);//3500
    }

    if(story === 4){

    text("MARIO HAVE TO SAVE THE PRINCESS",windowWidth/2,windowHeight/2 - 30);

      setTimeout(function(){
        story = 5;
        //3500
      },500);
    }

    if(story === 5){

    text("YOU HAVE TO PLAY THE ROLE OF THE MARIO & SAVE THE PRINCESS",windowWidth/2,windowHeight/2 - 30);

      setTimeout(function(){
        story = 5.5;
        //4500
      },500);
    }

  if(story === 5.5){
    
    text("PRESS 'SPACE' TO SAVE MARIO FROM ENEMIES",windowWidth/2, windowHeight/2 - 30);
    
      setTimeout(function(){
        story = 5.6;
      },500);
      //4500
  }
  
  
  if(story === 5.6){
    
    text("YOU HAVE THREE LIVES ONLY",windowWidth/2, windowHeight/2 - 30);
    
      setTimeout(function(){
        story = 6;
      },500);//3500
  }
  
    if(story === 6){

      startButton = createSprite(windowWidth/2,windowHeight/2 + 210);
      startButton.addImage(startButtonImage);
      startButton.scale = 0.5;
      startButtonGroup.add(startButton);

    if(mousePressedOver(startButton)){
        story = 0;
        gameState = START;
        pressStartGroup.destroyEach();
        startButtonGroup.destroyEach();
        startlogo.destroy();
        background("black");
        frameRate = 1;
        spawnB();
    }
        
   }
 }
 
}
function stop(){
  
  
    gameBackground.velocityX = 0
    
     turtleG.setVelocityXEach(0)
     mushroomG.setVelocityXEach(0)
     coinG.setVelocityXEach(0)
     block.setVelocityXEach(0)
   
}

//creating function to spaen enemies
function spawnEnemies(){
 
  //creating turtles
  if(frameCount % 100 === 0){
   
    turtle = createSprite(windowWidth + 50,windowHeight - 135);
    turtle.addImage("turtle",turtleImage);
    turtle.scale = 0.05;
    turtle.velocityX=-(6 + score/100)
    turtle.lifetime = windowWidth;
    turtle.depth = 5;
    turtleG.add(turtle);
    
    turtle.setCollider("rectangle",0,0,1140,1020);
  }
  
  //creating random mushrooms
  var r = Math.round(random(170,171));
  if(frameCount % r === 0){
    
    mushroom = createSprite(windowWidth + 50,windowHeight - 135);
    mushroom.addAnimation("mushroom",mushroomImage);
    mushroom.scale = 0.15;
    mushroom.velocityX=-(6 + score/100)
    mushroom.lifetime = windowWidth;
    mushroom.depth = 3;
    mushroomG.add(mushroom);
    console.log(mushroom.velocityX)

    
    mushroom.setCollider("rectangle",0,0,300,330);
  }

 
  if(frameCount % 60 === 0){
    
    coin = createSprite(windowWidth + 100,windowHeight - 435);
    coin.addAnimation("coin",coin_image);
    coin.scale = 1;
    coin.velocityX = -(6 + score/100);
    coin.lifetime = windowWidth;
    coin.depth = 4;
    coinG.add(coin);
    //coin.debug=true
    coin.setCollider("circle",0,0,20);
  }
  
}

//creating function to end the game
function end(){

  if(mushroomG.isTouching(mario) || turtleG.isTouching(mario)){
     if(life === 3){
        life -= 1; 
      heart1.destroy(); 
     for(i=0;i<mushroomG.length;i++){
       if(mushroomG.get(i).isTouching(mario)){
mushroomG.get(i).remove()
       }
     }
     for(i=0;i<turtleG.length;i++){
      if(turtleG.get(i).isTouching(mario)){
turtleG.get(i).remove()
      }
    }
     
   
       
       livelost.play();

       } else if(life === 2)
   { life -=1 
    heart2.destroy(); 
    for(i=0;i<mushroomG.length;i++){
      if(mushroomG.get(i).isTouching(mario)){
mushroomG.get(i).remove()
      }
    }
    for(i=0;i<turtleG.length;i++){
     if(turtleG.get(i).isTouching(mario)){
turtleG.get(i).remove()
     }
   }
    

    
     livelost.play();
     }
     else 
   { life -=1 
    heart3.destroy(); 
    for(i=0;i<mushroomG.length;i++){
      if(mushroomG.get(i).isTouching(mario)){
mushroomG.get(i).remove()
      }
    }
    for(i=0;i<turtleG.length;i++){
     if(turtleG.get(i).isTouching(mario)){
turtleG.get(i).remove()
     }
   }
    
    
    
    gameState = END;
     loseSound.play(); 
    
    }
  
    
  }
}

function keyPressed(){
  if ( keyCode === DOWN_ARROW){
    location.reload()
}
}

//creating function to create & set the game background in the screen
function spawnB(){
    
  gameBackground = createSprite(width/2,height/2);
  gameBackground.addImage(gameBackgroundImage);
  gameBackgroundImage.width = displayWidth;
  gameBackgroundImage.height = displayHeight;
  gameBackground.lifetime = windowWidth;
}