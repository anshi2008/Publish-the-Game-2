var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["7160bb45-d7b2-4f27-8795-e930350ef31b","8e6a27ef-c479-4c4b-bc2e-626279fe1d08"],"propsByKey":{"7160bb45-d7b2-4f27-8795-e930350ef31b":{"name":"striker.jpg_1","sourceUrl":null,"frameSize":{"x":675,"y":675},"frameCount":1,"looping":true,"frameDelay":12,"version":"WFPXEYBjoVyU6xr4_h9UFxsH4Cd9aku6","loadedFromSource":true,"saved":true,"sourceSize":{"x":675,"y":675},"rootRelativePath":"assets/7160bb45-d7b2-4f27-8795-e930350ef31b.png"},"8e6a27ef-c479-4c4b-bc2e-626279fe1d08":{"name":"mallet.jpg_1","sourceUrl":null,"frameSize":{"x":300,"y":300},"frameCount":1,"looping":true,"frameDelay":12,"version":"Uz8LB3Nj4Jfo9k_STRdC_2NimRQCAuS5","loadedFromSource":true,"saved":true,"sourceSize":{"x":300,"y":300},"rootRelativePath":"assets/8e6a27ef-c479-4c4b-bc2e-626279fe1d08.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;
//variable to store different state of game
var gameState = "serve";
//making goal 
var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");


// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,15,15);
striker.scale = 0.06;
striker.setAnimation("striker.jpg_1");

var computerMallet = createSprite(200,70,50,10);
computerMallet.scale = 0.2;
computerMallet.setAnimation("mallet.jpg_1");

var playerMallet = createSprite(200,330,50,10);
playerMallet.scale = 0.2;
playerMallet.setAnimation("mallet.jpg_1");
var computerscore = 0;
var playerscore = 0;




function draw() {
  //clear the screen
  background("lightgreen");
  
  //display score   
 textSize(20);
 fill("maroon");
 text(computerscore,25,225);
 text(playerscore,25,185);
 
  //serve Stae
  if(gameState == "serve")
  {
   //display text
  textSize(25);
  stroke("blue");
  text("Welcome! Press Space to start",30,250);
  
  //Moving the ball when press Space key
  if(keyDown("space")){
    striker.velocityX = 3;
    striker.velocityY = 4;
    gameState = "play";
  }
 
  }
  
  //Play State
  if(gameState == "play")
  {
  //make the player paddle move with the Arrow keys
  paddleMovement();
  if(playerscore == 5){
    gameState = "end";
  }
  }

  //End State
  if(gameState == "end")
  {
    
  //end screen when score reaches 5
  if (playerscore==5 || computerscore==5)
  {
    fill("blue");
    textSize(40);
    text("GAME OVER!",95,160);
  }
  }

   
  
  //serve the striker when space is pressed
  if (keyDown("space")) {
    serve();
  }
 
  
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = striker.x;

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
  
//increasing of score as it touch goal and reset its position
if(striker.isTouching(goal1))
{
  computerscore = computerscore + 1;
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
  
}

if(striker.isTouching(goal2))
{
  playerscore = playerscore +1;
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
  
}
  
  
 
  drawSprites();
}






function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>200)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y>50)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
