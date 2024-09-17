let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

// Select elements
const timeDisplay = document.getElementById('time-display');
const laps = document.getElementById('laps');

// Function to format time
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Function to update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
document.getElementById('startButton').addEventListener('click', function() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
        isRunning = true;
    }
});

// Pause the stopwatch
document.getElementById('pauseButton').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
});

// Reset the stopwatch
document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00";
    laps.innerHTML = "";
});

// Record a lap
document.getElementById('lapButton').addEventListener('click', function() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
});
