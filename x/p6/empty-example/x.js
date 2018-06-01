let bubble1
let bubble2
let imgx = 0
let imgy = 200
let img1 = 1700
let img2 = 200
let drops = [];
let droop = [];
let bubbles = [];
let bg;
let g = 0;
let song;
let player1score = 0;
let player2score = 0;

function preload() {
    img = loadImage("evil.jpg");
    imgp = loadImage("zeta.jpg");
    song = loadSound('unravel.mp3');
    map = loadImage('map.png');
    ship = loadImage('ship.png');
    ripship = loadImage('ripship.png');
}

function setup() {
  song.play();
  bg = loadImage("yay.jpg");
  createCanvas(windowWidth - 10, windowHeight - 10)

  for (let i = 0; i < 100; i++) {

    let x = random(0, width);
    let y = random(0, height);
    let r = 5;
    bubbles[i] = new Bubble(x, y, r, map);
  }


  bubble1 = new Bubble(100, 450, 70, ripship);

  bubble2 = new Bubble(1700, 450, 70, ship);
}





function draw() {
  background(bg);
  textSize(32);
  fill(255);
  text('player1score: ' + player1score, 10, 30);
  text('player2score: ' + player2score, 1650, 30);

  image(img, imgx, imgy);
  image(imgp, img1, img2);

  for (var i = 0; i < bubbles.length; i++) {

    bubbles[i].show();
  }
  bubble1.show();
  bubble2.show();
    for (let i = 0; i < drops.length; i++){
        drops[i].show();
        drops[i].move();
        if(drops[i].touch(bubble2)){
        console.log("boom")
        player1score++
        drops.splice(i,1)

        }
}
    for (let i = 0; i < droop.length; i++){
      droop[i].show();
      droop[i].move();
      if(droop[i].collide(bubble1)){
        console.log("collision")
        player2score++
        droop.splice(i,1)
    }
  }
  if(player1score >= 21){
    alert('WINNER PLAYIER 1')
    reset()
  }
  if(player2score >= 21){
    alert('WINNER PLAYIER 2')
    reset()
  }
}


class Bubble {
  constructor(x, y, r, ship) {
    this.x = x;
    this.y = y;
    this.r = r;
   this.ship = ship;
  }
  move(space) {
    this.y += space

  }
  show() {
    fill(255)

    strokeWeight(0);

    image(this.ship,this.x, this.y, this.r * 2, this.r * 2);
  }
}


function keyPressed(){
  console.log("keypress")
  if (keyCode === 32){
    let drop = new Drop(100, bubble1.y, 5);
    drops.push(drop);

  }
  console.log("keypress")
  if (keyCode === 48 ){
    let drap = new Drap(1800, bubble2.y, -5);
    droop.push(drap);

  }
  if(keyCode === 65){
    bubble1.move(-50);
  }else if (keyCode === 90){
    bubble1.move(50);
  }
  if(keyCode === 38){
    bubble2.move(-50);
  }else if (keyCode === 40){
    bubble2.move(50);
  }
}


class Drop {
  constructor(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = 25
    this.r = 25
  }
  show() {
    fill(255);
    ellipse(this.x, this.y, this.r*2, this.r*2)
  }
  move() {
    this.x = this.x + this.dx;
  }

  touch(bubble2){
    let d = dist(bubble2.x, bubble2.y , this.x, this.y)
    if(d < bubble2.r + this.r){
      return true;
    }
    else {
      return false;
      }
    }
}



class Drap {
  constructor(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = -25
    this.r = 25
  }
  show() {
    fill(0);
    ellipse(this.x, this.y, this.r*2, this.r*2)
  }
  move() {
    this.x = this.x + this.dx;
  }
  collide(bubble1){
    let distance = dist(bubble1.x, bubble1.y , this.x, this.y)
    if(distance < bubble1.r + this.r){
      return true;
    }
    else {
      return false;
    }
  }
}

function reset(){
drops = [];
droop = [];
player1score = 0;
player2score = 0;
}
//you_tube_link.txt
//youtu.be/OpMrJXdhmL4