

let usr = document.querySelector("#leftPaddle");
let com = document.querySelector("#rightPaddle");
let ball = document.querySelector("#ball");
let usrScore = document.querySelector("#scoreBlue");
let comScore = document.querySelector("#scoreRed");

usr.style.marginLeft = '30px';
usr.style.marginTop = "237px";
com.style.marginLeft = "1020px";
com.style.marginTop = "237px";
ball.style.marginLeft = "524px";
ball.style.marginTop = "262px";

let ID;
let wPressed = false;
let sPressed = false;
let Vx = -1;
let Vy = -1;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));

document.addEventListener("keydown", (e) => {
    if (e.key == "w") {
        wPressed = true;
    } else if (e.key == "s") {
        sPressed = true;
    }
});
document.addEventListener("keyup", (e) => {
    if (e.key == "w") {
        wPressed = false;
    } else if (e.key == "s") {
        sPressed = false;
    }
});

gameLoop();

function reset() {
    new Audio("miss.wav").play();
    setTimeout(() => {
        comScore.classList.remove('point');
        usrScore.classList.remove('point');
    }, 300);
    clearInterval(ID);
    Vx = -1;
    Vy = -1;
    V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
    ball.style.marginLeft = "524px";
    ball.style.marginTop = "262px";
    gameLoop();
}

function gameLoop() {
    setTimeout(() => {
        ID = setInterval(() => {
            //collide sidewall
            if (marginLeft(ball) < 0) {
                comScore.innerHTML = Number(comScore.innerHTML) + 1;
                comScore.classList.add('point');
                reset();
                return;
            }
            if (marginLeft(ball) + 20 > 1076) {
                usrScore.innerHTML = Number(usrScore.innerHTML) + 1;
                usrScore.classList.add('point');
                reset();
                return;
            }
            if (marginTop(ball) < 0 || marginTop(ball) + 20 > 522) {
                Vy = -Vy;
            }

            //decide which paddle
            let paddle = (marginLeft(ball) + 10 < 544) ? usr : com;

            if (collisionDetected(paddle)) {
                console.log("detect");

                let angle;
                let type = (marginLeft(paddle) == 30) ? "user" : "comp";

                if (ball.centerY < paddle.centerY) {
                    angle = (type == "user") ? -Math.PI / 4 : (-3 * Math.PI) / 4;
                } else
                    if (ball.centerY > paddle.centerY) {
                        angle = (type == "user") ? Math.PI / 4 : (3 * Math.PI) / 4;
                    } else
                        if (ball.centerY == paddle.centerY) {
                            angle = (type == "user") ? 0 : Math.PI;
                        }


                if (type == "user") {
                    usr.classList.add('left');
                    setTimeout(() => {
                        usr.classList.remove('left');
                    }, 200);
                } else if (type == "comp") {
                    com.classList.add('right');
                    setTimeout(() => {
                        com.classList.remove('right');
                    }, 200);
                }

                V += 0.2;
                Vx = V * Math.cos(angle);
                Vy = V * Math.sin(angle);

                new Audio("touch.wav").play();
            }
            //computer/red player
            let compLevel = 0.08;
            com.style.marginTop = `${marginTop(com) + (ball.centerY - (marginTop(com) + 36)) * compLevel}px`;

            ball.style.marginLeft = `${marginLeft(ball) + Vx}px`;
            ball.style.marginTop = `${marginTop(ball) + Vy}px`;
            //user paddle move
            if (wPressed && marginTop(usr) > 0) {
                usr.style.marginTop = `${marginTop(usr) - 3}px`;
            } else if (sPressed & (marginTop(usr) < 450)) {
                usr.style.marginTop = `${marginTop(usr) + 3}px`;
            }
            //compter paddle move
            if (marginTop(com) < 0) {
                com.style.marginTop = `0px`;
            } else if (marginTop(com) > 450) {
                com.style.marginTop = `450px`;
            }
        }, 5)
    }, 500)
}

function collisionDetected(paddle) {
    ball.top = marginTop(ball);
    ball.bottom = marginTop(ball) + 20;
    ball.left = marginLeft(ball);
    ball.right = marginLeft(ball) + 20;
    ball.centerX = marginLeft(ball) + 10;
    ball.centerY = marginTop(ball) + 10;

    paddle.top = marginTop(paddle);
    paddle.bottom = marginTop(paddle) + 70;
    paddle.left = marginLeft(paddle);
    paddle.right = marginLeft(paddle) + 15;
    paddle.centerX = marginLeft(paddle) + 7.5;
    paddle.centerY = marginTop(paddle) + 35;
    let type2 = (marginLeft(paddle) == 30) ? 'user' : 'comp';
    let boolean = false;

    if (type2 == 'user' && Vx < 0) {
        boolean = true;
    } else
        if (type2 == 'comp' && Vx > 0) {
            boolean = true;
        }

    return ball.left < paddle.right && ball.top < paddle.bottom && ball.right > paddle.left && ball.bottom > paddle.top && boolean;
}

function marginTop(elem) {
    return Number(elem.style.marginTop.split("p")[0]);
}

function marginLeft(elem) {
    return Number(elem.style.marginLeft.split("p")[0]);
}



