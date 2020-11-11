var bananaImage, foodGroup;
var obstacleImage, obstacleGroup;
var monkey, monkey_running;
var backGround, backImg;
var gameState = "play";
var invsibleGround, score;

function preload() {
  backImg = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 500);

  backGround = createSprite(200, 200, 1000, 400);
  backGround.addImage("background", backImg);
  backGround.x = backGround.width / 2;

  backGround.velocityX = -4;
  monkey = createSprite(50, 180, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  invisibleGround = createSprite(200, 490, 400, 10);
  invisibleGround.visible = false;

  foodGroup = new Group();
  obstaclegroup = new Group();

  score = 0;
}

function draw() {
  background(200);

  if (gameState == "play") {

    if (keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (backGround.x < 0) {
      backGround.x = backGround.width/2;
    }
    backGround.velocityX = -3;

    if (foodGroup.isTouching(monkey)) {
      score = score + 2;
      foodGroup.destroyEach();

      switch (score) {
        case 10:
          monkey.scale = 0.31;
          break;
        case 20:
          monkey.scale = 0.33;
          break;
        case 30:
          monkey.scale = 0.35;
          break;
        case 40:
          monkey.scale = 0.38;
          break;
        default:
          break;
      }
    }
    food();
    Obstacles();

    if (obstaclegroup.isTouching(monkey)) {
      monkey.scale = 0.2;
    }
    if (obstaclegroup.isTouching(monkey) && monkey.scale == 0.2) {
      gameState = "END";
    }
  } else if (gameState === "END") {
    backGround.velocityX = 0;
    monkey.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    obstaclegroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

  }
  drawSprites();

  stroke("white");
  textSize = 20;
  fill("white");
  text("score: " + score, 400, 50);
  monkey.collide(invisibleGround);
}

function food() {
  if (frameCount % 120 == 0) {
    var banana = createSprite(600, 480, 40, 10);
    banana.addImage("bananaimage", bananaImage)
    banana.scale=0.1;
    banana.y = random(190, 250);
    banana.velocityX = -4;
    banana.lifetime = 120;

    foodGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 150 == 0) {
    var Obstacle = createSprite(600, 420, 50, 50);
    Obstacle.addImage("Stone", obstacleImage);
    Obstacle.scale=0.2;
    Obstacle.velocityX = -4;
    Obstacle.lifetime = 200;

    obstaclegroup.add(Obstacle);
    Obstacle.debug= true;
    Obstacle.setCollider("circle",-60,-30,30);
  }
}
