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

document.addEventListener('mousemove', e => {
  lineH.setAttribute("style", "top: " + e.pageY + "px;");
  lineV.setAttribute("style", "left: " + e.pageX + "px;");
  coordInfo.innerHTML = `x: ${e.pageX} || y: ${e.pageY}`
  if (e.pageX <= canvas.width && e.pageY <= canvas.height) {
    canvasClick(e);
  }
});

function canvasClick(e) {
  canvas.addEventListener('click', (e) => {
    coord_canva.innerHTML = `x: ${e.pageX} || y: ${e.pageY}`
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

let innerRectWidth = (canvas.width * 25) / 100;
let innerRectHeight = (canvas.height * 25) / 100;
let innerRectStartX = (canvas.width / 2) - (innerRectWidth / 2);
let innerRectStartY = (canvas.height / 2) - (innerRectHeight / 2);

// variables that will change to move forward the element 
let animateInnerRectWidth = Math.floor(innerRectWidth);
let animateInnerRectHeight = innerRectHeight;
let animateInnerRectStartX = Math.floor(innerRectStartX);
let animateInnerRectStartY = innerRectStartY;


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

  // MOVEMENT ELEMENT
  ctx.beginPath();
  ctx.strokeStyle = "#10eaf0";
  ctx.rect(animateInnerRectStartX, animateInnerRectStartY, animateInnerRectWidth, animateInnerRectHeight);
  ctx.stroke();

  // when the animated width > canvas.width come back to the originals proportions
  if (animateInnerRectWidth > canvas.width) {
    animateInnerRectWidth = innerRectWidth;
    animateInnerRectHeight = innerRectHeight;
    animateInnerRectStartX = innerRectStartX;
    animateInnerRectStartY = innerRectStartY;
  }

  // dratio == ratio velocity
  dratio = 6;
  animateInnerRectWidth += (ratioW / dratio);
  animateInnerRectHeight += (ratioH / dratio);
  // dratio * 2 because the X & Y need to move in the opposite direction.
  animateInnerRectStartX -= (ratioW / (dratio * 2));
  animateInnerRectStartY -= (ratioH / (dratio * 2));

  /**
   * create random square
   * todo: add some random colors (tron related)
   */
  ctx.beginPath();
  ctx.strokeStyle = "#10eaf0";
  ctx.rect(animateInnerRectStartX + 30, animateInnerRectStartY + 10, 16, 9);
  ctx.stroke();

}

btnStart.addEventListener('click', function () {
  animate();
}) 