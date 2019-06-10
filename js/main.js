/**
 * Project: 
 * create a simple game that will shoot laser and destroy squares that come towards you
 *  
 */

/**
 * CURSOR LINE MOVEMENT
 * lineH = horizontal line, width 100% move on Y coords from top-bottom
 * lineV = vertical line, heigh 100% move on X coods from left-right
 */

let lineH = document.querySelector('.lineH');
let lineV = document.querySelector('.lineV');

let coordInfo = document.querySelector('.coord');
let coord_canva = document.querySelector('.coord_canva');

let canvas = document.getElementById('myCanvas');
let ctx = myCanvas.getContext('2d');

let btnStart = document.querySelector('.start');

/**
 * pageX and pageY is not good if the page scrolling is on. 
 * better use screenX - screenY
 * screen bugs
 * clientX clientY
 *  */
document.addEventListener('mousemove', e => {
  lineH.setAttribute("style", "top: " + e.clientY + "px;");
  lineV.setAttribute("style", "left: " + e.clientX + "px;");
  coordInfo.innerHTML = `x: ${e.clientX} || y: ${e.clientY}`
  if (e.clientX <= canvas.width && e.clientY <= canvas.height) {
    canvasClick(e);
  }
});

function canvasClick(e) {
  canvas.addEventListener('click', (e) => {
    coord_canva.innerHTML = `x: ${e.clientX} || y: ${e.clientY}`
  });
}

/**
 * code for the canvas  
 * 
 */

// need to change this variables to be 
// 1440 * 900
// canvas.width = '1366';
// canvas.height = '768';
canvas.height = '250';
canvas.width = canvas.height * 1.8;
let ratioW = 16;
let ratioH = 9;

/**
 * ratio 16:9 - for every 16px in width the height increese by 9
 * width : 16
 * height : 9
 * X : width / 2
 * Y : height / 2
 * 16/2 = 8
 * 9/2=4.5
 * 8/2=4
 * 4.5/2=2.25
 */

/**
 * there will be square that will show randomly inside the canvas
 * 
 */

// DRAW A LINE 
// *****************************************


// bottom lines that come close to the player
/**
 * moving towards the player 
 * moveTo(-x, +y)
 * lineTo(+x, +y)
 * 1) try with 1px (maybe need to calc with the degree of the lines)
 */
let x1 = 256;
let x2 = 384;
let y = 240;
let dratio = 6;
let innerRectWidth = (canvas.width * 25) / 100;
let innerRectHeight = (canvas.height * 25) / 100;
let innerRectStartX = (canvas.width / 2) - (innerRectWidth / 2);
let innerRectStartY = (canvas.height / 2) - (innerRectHeight / 2);

// variables that will change to move forward the element 
let animateInnerRectWidth = Math.floor(innerRectWidth);
let animateInnerRectHeight = innerRectHeight;
let animateInnerRectStartX = Math.floor(innerRectStartX);
let animateInnerRectStartY = innerRectStartY;

// this object will draw the inner rectangle that become bigger
function Rectangle(
  animateInnerRectStartX,
  animateInnerRectStartY,
  animateInnerRectWidth,
  animateInnerRectHeight,
  dratio,
  ratioW,
  ratioH,
  innerRectWidth,
  innerRectHeight,
  innerRectStartX,
  innerRectStartY, ) {

  this.animateInnerRectStartX = animateInnerRectStartX;
  this.animateInnerRectStartY = animateInnerRectStartY;
  this.animateInnerRectWidth = animateInnerRectWidth;
  this.animateInnerRectHeight = animateInnerRectHeight;
  this.dratio = dratio;
  this.ratioW = ratioW;
  this.ratioH = ratioH;
  this.innerRectWidth = innerRectWidth;
  this.innerRectHeight = innerRectHeight;
  this.innerRectStartX = innerRectStartX;
  this.innerRectStartY = innerRectStartY;
  this.draw = function () {
    // MOVEMENT ELEMENT
    ctx.beginPath();
    ctx.strokeStyle = "#10eaf0";
    ctx.rect(
      this.animateInnerRectStartX,
      this.animateInnerRectStartY,
      this.animateInnerRectWidth,
      this.animateInnerRectHeight
    );
    ctx.stroke();
    // console.log('draw');

  }

  this.update = function () {
    // console.log('update');
    // when the animated width > canvas.width come back to the originals proportions
    if (this.animateInnerRectWidth > canvas.width) {

      this.animateInnerRectWidth = this.innerRectWidth;
      this.animateInnerRectHeight = this.innerRectHeight;
      this.animateInnerRectStartX = this.innerRectStartX;
      this.animateInnerRectStartY = this.innerRectStartY;
    }

    // dratio == ratio velocity
    // this.dratio = 6;
    this.animateInnerRectWidth += (this.ratioW / this.dratio);
    this.animateInnerRectHeight += (this.ratioH / this.dratio);
    // dratio * 2 because the X & Y need to move in the opposite direction.
    this.animateInnerRectStartX -= (this.ratioW / (this.dratio * 2));
    this.animateInnerRectStartY -= (this.ratioH / (this.dratio * 2));

    this.draw();
  }
}
var rekt = new Rectangle(
  animateInnerRectStartX,
  animateInnerRectStartY,
  animateInnerRectWidth,
  animateInnerRectHeight,
  dratio,
  ratioW,
  ratioH,
  innerRectWidth,
  innerRectHeight,
  innerRectStartX,
  innerRectStartY);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  // top-left line 
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(innerRectStartX, innerRectStartY);
  ctx.strokeStyle = "#10eaf0";
  ctx.stroke();

  // top-right line 
  ctx.beginPath();
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo((innerRectWidth + innerRectStartX), innerRectStartY);
  ctx.strokeStyle = "#10eaf0";
  ctx.stroke();

  // bottom-right line 
  ctx.beginPath();
  ctx.moveTo(canvas.width, canvas.height);
  ctx.lineTo((innerRectWidth + innerRectStartX), (innerRectHeight + innerRectStartY));
  ctx.strokeStyle = "#10eaf0";
  ctx.stroke();

  // bottom-left line
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(innerRectStartX, (innerRectHeight + innerRectStartY));
  ctx.strokeStyle = "#10eaf0";
  ctx.stroke();

  // DRAW A RECTANGLE
  // *****************************************
  // c.fillRect(x, y, width, height);
  // STATIC ELEMENT
  ctx.beginPath();
  ctx.strokeStyle = "#10eaf0";
  ctx.rect(innerRectStartX, innerRectStartY, innerRectWidth, innerRectHeight);
  ctx.stroke();
  // why dont' reset the thing...
  // MOVEMENT ELEMENT
  // ctx.beginPath();
  // ctx.strokeStyle = "#10eaf0";
  // ctx.rect(animateInnerRectStartX, animateInnerRectStartY, animateInnerRectWidth, animateInnerRectHeight);
  // ctx.stroke();

  if (animateInnerRectWidth > canvas.width) {
    console.log('22');

    // animateInnerRectWidth = innerRectWidth;
    // animateInnerRectHeight = innerRectHeight;
    // animateInnerRectStartX = innerRectStartX;
    // animateInnerRectStartY = innerRectStartY;
    // rekt.update();

  }

  /**
   * create random square
   * todo: add some random colors (tron related)
   */
  // ctx.beginPath();
  // ctx.strokeStyle = "#10eaf0";
  // ctx.rect(animateInnerRectStartX + 30, animateInnerRectStartY + 10, 16, 9);
  // ctx.stroke();
  rekt.update();
}

btnStart.addEventListener('click', function () {
  animate();
}) 