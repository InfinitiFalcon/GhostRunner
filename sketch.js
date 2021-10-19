var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group
  climbersGroup = new Group
  invisibleBlockGroup = new Group
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  ghost = createSprite(200, 200)
  ghost.addImage("Ghost",ghostImg)
  ghost.scale = 0.3
  
}

function draw() {
  background("black");
  if (gameState == "play"){
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY += 0.5
  if(keyDown("RIGHT_ARROW")){
    ghost.x += 10
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x -= 10
  }
  if(tower.y > 400){
      tower.y = 300
    }
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy()
    gameState = "End"
  }

    doorSpawn()

    drawSprites()
}
if (gameState == "End"){
  textSize(30)
  fill("yellow")
  text("Game Over", 300, 300)
}
}


function doorSpawn(){
  if (frameCount % 180 === 0){
    door = createSprite(Math.round(random(100, 300)), 20)
    door.addImage("Door",doorImg)
    door.velocityY = 3
    door.lifetime = 800
    doorsGroup.add(door)
    door.depth = ghost.depth
    ghost.depth += 1

    climber = createSprite(200, 10)
    climber.addImage("climber", climberImg)
    climber.x = door.x
    climber.y = door.y + 65
    climber.velocityY = 3
    climber.lifetime = 800
    climbersGroup.add(climber)

    invisibleBlock = createSprite(200, 10, 80, 5)
    invisibleBlock.shapeColor = "green"
    invisibleBlock.x = climber.x
    invisibleBlock.y = climber.y + 3
    invisibleBlock.velocityY = 3
    invisibleBlock.lifetime = 800
    invisibleBlockGroup.add(invisibleBlock)
  }
}