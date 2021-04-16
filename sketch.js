//P-35 WHTJR - VIRTUAL PET V1 - MASTER
//WAIT HOW DID YOU GET HERE
//At 20:50 16-04-2021

var standingDogImage, lyingDogImage, doggo;
var database;
var foodS, foodStock, readStock, writeStock;

function preload() {
  standingDogImage = loadImage("dogImg.png");
  lyingDogImage = loadImage("dogImg1.png");

}

function setup() {
    createCanvas(700, 500);

    console.log("https://console.firebase.google.com/project/project-35---virtual-pet-43f40/database/project-35---virtual-pet-43f40-default-rtdb/data ; was not allowed to start");
    database = firebase.database();

    doggo = createSprite(width/2, height/2, 50, 50);
    doggo.addImage(standingDogImage);
    doggo.scale= 0.3;

    foodStock = database.ref('Food');
    foodStock.on("value", readStock, writeStock);

}

function draw() {
    background(46, 139, 87);

    textSize(15);
    fill(255, 255, 255);
    text("Remaining Food : "+foodS, 50, 450);

    text("Press the UP ARROW key to feed your dog some food!", 170, 20);

    if (keyWentDown("UP_ARROW")) {
      writeStock(foodS-1);

      doggo.addImage(lyingDogImage);
  
    }
  
    drawSprites();
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 1) {
    text("Oh no! You're out of food! :c", 250, 50);
    x = 0;
  } 

  database.ref('/').update({
    Food:x
  })
}

