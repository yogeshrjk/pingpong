const c = document.getElementById("myCanvas");
const ctx = c.getContext('2d');

const w = 600;
const h = 400;

//paddle
const paddleW = 10;
const paddleH = 60;

c.width = w;
c.height = h;

// create a rectangle

ctx.fillStyle = "black";
ctx.fillRect(0, 0, w, h);

// create paddle left
ctx.fillStyle = "blue";
ctx.fillRect(10, 170, paddleW, paddleH);     //left: 10px | top: 400-60 = 340/2 = 170

// create paddle right
ctx.fillStyle = "red";
ctx.fillRect(w - 20, 170, paddleW, paddleH);     //left: 400-60 = 340/2 =170 | top: 600-20 = 580 + 10 = 590, 600-20

//center line
ctx.beginPath();
ctx.setLineDash([6]);
ctx.moveTo(w / 2, 0);
ctx.lineTo(w / 2, h);
ctx.strokeStyle = "grey";
ctx.stroke();

//ball
ctx.beginPath();
ctx.arc(w / 2, h / 2, 10, 2 * Math.PI, false);  //x,y,radius,startAngle,endAngle,[antiClockWise:optional]
ctx.fillStyle = "orange";
ctx.fill();

//playerSocre
ctx.font = "75px Arial";
ctx.fillStyle = "grey";
ctx.fillText(0, w / 2 - 140, h / 2 + 30);
ctx.fillText(0, w / 2 + 100, h / 2 + 30);