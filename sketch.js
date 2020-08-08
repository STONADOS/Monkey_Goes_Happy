//Global Variables

var monkey, monkeyimage, monkeystopped;
var back, back2, ig, groundimage, backimage;
var stone, dot, banana, stoneimage, bananaimage;
var dg, sg, bg;
var gameover, gameoverimage;
var restart, restartimage;
var gamestate = 1;
var score = 0;
var jump = "jump";
var no = 0;
var button;


function preload() {
  monkeyimage = loadAnimation("Monkey_03.png" , "Monkey_02.png", "Monkey_01.png", "Monkey_04.png", "Monkey_06.png", "Monkey_05.png", "Monkey_07.png", "Monkey_09.png", "Monkey_08.png", "Monkey_10.png");
  stoneimage = loadImage("stone.png");
  bananaimage = loadImage("Banana.png");
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  backimage = loadImage("jungle.jpg");
  monkeystopped = loadImage("mon.png")
}


function setup() {
  createCanvas(600, 300);

  back = createSprite(300, 150, 300);
  back.addImage("ground", backimage);
  back.scale = 0.7;
  back.velocityX = -7;

  back2 = createSprite(1000, 150, 300);
  back2.addImage("ground", backimage);
  back2.scale = 0.7;
  back2.velocityX = -7;



  monkey = createSprite(50, 30, 20, 50);
  monkey.addAnimation("run", monkeyimage);
  monkey.scale = 0.12

  ig = createSprite(200, 290, 800, 20);
  ig.shapeColor = "silver";
  ig.visible = false;

  sg = new Group();

  dg = new Group();

  banana = createSprite(700, 220);
  banana.addImage("Banana", bananaimage);
  banana.y = random(120, 190);
  banana.scale = 0.06;

  gameover = createSprite(300, 100);
  gameover.addImage("gameover", gameoverimage);
  gameover.visible = false;

  restart = createSprite(300, 200);
  restart.addImage("restart", restartimage)
  restart.visible = false;
  
  button = createSprite(70, 90, 70, 70)
  button.shapeColor="pink";
}


function draw() {
  background(0);
  if (gamestate == 1) {

    ig.visible = false;

    if (back.x < -350) {
      back.x = 1000;
    }
    if (back2.x < -350) {
      back2.x = 1000;
    }

    back.visible = true;
    back2.visible = true;
    button.visible = true;
    
    banana.velocityX = -(score / 100 + 8);

    if (banana.isTouching(monkey)) {
      score += 2;
      banana.x = 700;
      banana.y = random(120, 190);
    }
    if (banana.x < 0) {
      banana.x = 700;
      banana.y = random(120, 190);
    }
    if (keyDown("space")|| mousePressedOver(button) && monkey.collide(ig)) {
      monkey.velocityY = -8;
      no +=1;
    }
    if (keyDown("down")) {
      monkey.velocityY = 9;
    }
    
    monkey.velocityY += 0.3;

    if (frameCount % 60 == 0) {
      stone = createSprite(700, 250);
      dot = createSprite(stone.x, stone.y, 30, 30)
      dot.velocityX = -7;
      dot.visible = false;
      stone.addImage("stone", stoneimage);
      stone.scale = 0.2;
      stone.velocityX = -7;
      dg.add(dot);
      sg.add(stone);
      stone.lifetime = 200;
      stone.depth = monkey.depth;
    }

    if (dg.isTouching(monkey)) {
      gameover.visible = true;
      restart.visible = true;
      gamestate = 2;
    }
    if (score > 0 && score % 20 == 0) {
      monkey.scale = 0.2;}
      
    else if (score > 0 && score % 30 == 0) {
      monkey.scale = 0.12;
    }
  }
  monkey.collide(ig);
  drawSprites();
  textSize(30);
  fill("pink");
  stroke("black")
  text("Score:" + score, 50, 40);
  text("Jumps: "+ no, 450,40);

  if (gamestate == 2) {
    button.visible= false;
    back.visible = false;
    back2.visible = false;
    sg.setVelocityXEach(0);
    dg.setVelocityXEach(0);
    sg.setLifetimeEach(-1);
    monkey.velocityY = 0
    banana.x = 630;
    banana.velocityX = 0;
    monkey.depth += 1;
    monkey.addImage("run", monkeystopped);
    if (monkey.y > 130 && jump == "jump") {
      monkey.velocityY = -30;
      jump = "land";
    }
    if (jump == "land") {
      monkey.velocityY += 5;
    }

    if (mousePressedOver(restart)) {
      sg.destroyEach();
      dg.destroyEach();
      gamestate = 1;
      back.x = 300;
      back2.x = 1000;
      back2.velocityX = -7;
      back.velocityX = -7;
      gameover.visible = false;
      restart.visible = false;
      score = 0;
      no = 0;
      monkey.addAnimation("run", monkeyimage);
    }
  }
}

