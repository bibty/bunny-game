const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope, rope2, rope3;
var fruit_con, fruit_con2, fruit_con3;
var button, button2, button3; 
var bg_img;
var food;
var rabbit;
var bunny; 
var blink; 
var eat; 
var sad; 
var cutting
var eating
var crying
var bjmusic 
var air 
var mute 



function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  blink.playing = true 
  eat.playing = true
  eat.looping = false 
  sad.playing = true
  sad.looping = false
  air = loadSound("air.wav");
  cutting = loadSound("Cutting Through Foliage.mp3"); 
  eating = loadSound("eating_sound.mp3")
  crying = loadSound("sad.wav");
  bjmusic = loadSound("sound1.mp3"); 
  

}

function setup() 
{
  var ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (ismobile){
    canwidth = displayWidth; 
    canheight = displayHeight; 
    createCanvas(canwidth, canheight); 
  }

  else{
    canwidth = windowWidth; 
    canheight = windowHeight; 
    createCanvas(canwidth, canheight); 
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canheight,600,20);

  rope = new Rope(6,{x:245,y:30});
  rope2 = new Rope(8,{x:345, y:150});
  rope3 = new Rope(9,{x:50, y:20});
  fruit = Bodies.circle(300,300,20);

  button = createImg("cut_button.png")
  button.size(50,50)
  button.position(225,20)
  button.mouseClicked(drop)

  button2 = createImg("cut_button.png")
  button2.size(50,50)
  button2.position(325,150)
  button2.mouseClicked(drop2)

  button3 = createImg("cut_button.png")
  button3.size(50,50)
  button3.position(50,20)
  button3.mouseClicked(drop3)

  balloon = createImg("balloon.png")
  balloon.size(50,50)
  balloon.position(100,290)
  balloon.mouseClicked(blowing)

  mute = createImg("mute.png")
  mute.size(50,50)
  mute.position(300,50)
  mute.mouseClicked(Mute)


  bunny = createSprite(225, canheight - 80, 50, 50)
  bunny.addImage(rabbit)
  bunny.scale = 0.2
  blink.frameDelay = 20
  eat.frameDelay = 20
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking",blink)
  


  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2, fruit); 
  fruit_con3 = new Link(rope3, fruit); 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  bjmusic.play(); 
  bjmusic.setVolume(0.5)



  
}

function draw() 
{
  background(51);



  image(bg_img,width/2,height/2,canwidth, canheight);

 
  rope.show();
  rope2.show(); 
  rope3.show(); 
  Engine.update(engine);
  ground.show();

  drawSprites()

  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,60,60)
  }
   
  if(collide(fruit,bunny)== true){
    bunny.changeAnimation("eating",eat)
    eating.play(); 
  }

  if(fruit != null && fruit.position.y >= 650){
    bunny.changeAnimation("crying",sad)
    bjmusic.stop(); 
    crying.play()
    crying.setVolume(0.3)
    fruit = null; 
  }

}

function drop()
{
  rope.break()
  fruit_con.detatch()
  fruit_con = null
  cutting.play();
}

function drop2()
{
  rope2.break()
  fruit_con2.detatch()
  fruit_con2 = null
  cutting.play();
}

function drop3()
{
  rope3.break()
  fruit_con3.detatch()
  fruit_con3 = null
  cutting.play();
}

function collide(body,sprite)
{
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d <= 80){
      World.remove(engine.world,fruit)
      fruit = null
      return true
      

    }
    else{
      return false
    }
  }
}

function blowing()
{
  Matter.Body.applyForce(fruit,{x: 0, y:0 },{x:0.01, y:0})
  air.play(); 
}

function Mute()
{
  if(bjmusic.isPlaying()){
    bjmusic.stop(); 
  }
  else{
    bjmusic.play()
  }
}