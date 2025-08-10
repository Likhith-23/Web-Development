let timer;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;

const timeDisplay = document.getElementById("timeDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function updateTime() {
    seconds++;
    if (seconds === 60) { seconds = 0; minutes++; }
    if (minutes === 60) { minutes = 0; hours++; }

    let displayHours = hours < 10 ? "0" + hours : hours;
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

startPauseBtn.addEventListener("click", () => {
    if (!isRunning) {
        timer = setInterval(updateTime, 1000);
        startPauseBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        isRunning = false;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0; minutes = 0; hours = 0;
    timeDisplay.textContent = "00:00:00";
    startPauseBtn.textContent = "Start";
    laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    if (isRunning) {
        let lapTime = timeDisplay.textContent;
        let li = document.createElement("li");
        li.textContent = `Lap: ${lapTime}`;
        laps.appendChild(li);
    }
});
