//THESE ARE ASSIGNED VALUES AND WILL NOT CHANGE.
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");

//THESE VALUES WILL BE CHANGED, REPLACED AND DELETED AS THE GAME RUNS.
let lastHole;
let timeUp = false;
let timeLimit = 20000; //20 sec
let score = 0;
let countdown;
let hitSound = new Audio("sound/whackSound.wav");
let timeSound = new Audio("sound/timeout.wav");

//THIS FUNCTION PICKS A RANDOM HOLE FOR THE monster TO POP OUT FROM.
function pickRandomHole(holes) {
  //hold 6 holes
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole]; // random pick 1 out 6 holes
  if (hole === lastHole) {
    //  will not appear twice as the previous
    return pickRandomHole(holes); //pick another hole
  }
  lastHole = hole; // else keep running & pick random
  return hole;
}

//THIS FUNCTION CONTROLS THE RANDOM TIME FROM WHICH THE monster WILL ANIMATE OUT FROM AND THEN GO BACK IN.
function popOut() {
  const time = Math.random() * 2000; // pick random time
  const hole = pickRandomHole(holes); //new declaration - indept
  hole.classList.add("up"); // mole peek out
  setTimeout(function () {
    // set time for pick out [base on time variable line 31]
    hole.classList.remove("up"); //mole slide backdown
    if (!timeUp) popOut(); // check if game havent ended yet, (if not - call pop out again)
  }, time); //after time passed [slide mole back down, line 35 ]
}

//THIS FUNCTION CONTROLS THE GAMEPLAY.
function startGame() {
  countdown = timeLimit / 1000; // 20sec
  scoreBoard.textContent = "Score:" + 0; //set to 0
  scoreBoard.style.display = "block"; //make it appear invisible, before start again
  countdownBoard.textContent = "Time:" + countdown; // show countdown
  startButton.style.display = "none"; // hide button, when start
  timeUp = false; // reset time if true
  score = 0; //reset back to zero
  popOut(); // call pop out to start mole to peek
  setTimeout(function () {
    // [how long should wait before callback function   ]
    timeUp = true; // set tru [avoid next mole to show up]
  }, timeLimit); // wait for 20 sec

  let startCountdown = setInterval(function () {
    countdown -= 1; // -1 time
    countdownBoard.textContent = "Time:" + countdown; // show count down
    if (countdown < 0 && startButton.style.display === "none") {
      countdown = 0; // 0 instead of -1
      startButton.style.display = "block"; //show  button
      clearInterval(startCountdown); //stopcountdown
      countdownBoard.textContent = "Timeout!!"; //& show time up
      timeSound.play();
    }
  }, 1000);
}

startButton.addEventListener("click", startGame); // click button

// THIS FUNCTION WHEN USER HIT THE MONSTER
function hit(e) {
  score++; //when whack -> +1
  this.style.backgroundImage = 'url("img/whack.png")';
  //when whack show whack img

  hitSound.play();

  this.style.pointerEvents = "none"; // disable all mouse interaction

  //** need to set back to ori image when hit  */
  setTimeout(() => {
    this.style.backgroundImage = 'url("img/palpatine2.png")';
    hitSound.pause();
    this.style.pointerEvents = "all"; // to click each mole once
  }, 800);
  scoreBoard.textContent = "Score:" + score;
}

//when mole click each Mole [it, goes on the hit fucntion  ]
moles.forEach((mole) => mole.addEventListener("click", hit));
