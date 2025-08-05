


//different pages
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
function hideall() {
    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "none";
}
page1btn.addEventListener("click", function () {
    hideall();
    page1.style.display = "block";
});
page2btn.addEventListener("click", function () {
    hideall();
    page2.style.display = "block";
});
page3btn.addEventListener("click", function () {
    hideall();
    page3.style.display = "block";
});
hideall();



//game

//ball movement
let BALL_DRAG = false;

let BALL_START_X = 0;
let BALL_START_Y = 0;
let BALL_END_X = 0;
let BALL_END_Y = 0;

const ball = document.getElementById("ball");
const pins = document.querySelectorAll(".pin");
const guide = document.getElementById("guide");
const strikeaudio = new Audio("audio/strike.mp3");

const handleGrab = (event) => {
    BALL_DRAG = true;
    BALL_START_X = event.pageX;
    BALL_START_Y = event.pageY;
    console.log(ball.style.top);
};

const handleDragBall = (event) => {
    if (!BALL_DRAG) return;

    let mouseX = event.pageX;
    let mouseY = event.pageY;
    ball.style.left = mouseX - 40 + 'px';
    ball.style.top = mouseY - 40 + 'px';

    BALL_END_X = event.pageX;
    BALL_END_Y = event.pageY;

    adjustGuide();
};

const handleReleaseBall = () => {
    BALL_DRAG = false;

    let { angle_rad } = angleCalc();
    setInterval(() => {
        ball.style.top = parseInt(ball.style.top) - Math.cos(angle_rad) * 10 + 'px';
        ball.style.left = parseInt(ball.style.left) - Math.sin(angle_rad) * 10 + 'px';
    }, 30);

    setTimeout(() => {
        for (let i = 0; i < pins.length; i++) {
            pins[i].classList.add("fall");
        }
    }, 1900);

    setTimeout(()=> {
        strikeaudio.play();
    }, 1900)
};

const angleCalc = () => {
    let adj = BALL_END_Y - BALL_START_Y;
    let opp = BALL_END_X - BALL_START_X;
    let tan = opp / adj;
    let angle_rad = Math.atan(tan);

    calc = {
        adj,
        angle_rad
    }

    return calc;
};




const adjustGuide = () => {
    let { adj, angle_rad } = angleCalc();
    guide.style.height = adj + 'px';
    guide.style.transform = `rotate(${-angle_rad}rad)`;
};


ball.addEventListener('pointerdown', handleGrab);
ball.addEventListener('pointerup', handleReleaseBall);
document.addEventListener('pointermove', handleDragBall);

