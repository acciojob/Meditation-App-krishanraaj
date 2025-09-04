//your JS code here. If required.
// script.js

const video = document.getElementById('meditation-video');
const audio = document.getElementById('meditation-audio');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.getElementById('time-select');
let soundPickerBtns = document.querySelectorAll('.sound-picker button');

let durations = {
    'smaller-mins': 120,
    'medium-mins': 300,
    'long-mins': 600
};
let currentDuration = 600; // Default 10 minutes
let timer;
let isPlaying = false;

// Time Select Buttons
timeSelect.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        currentDuration = durations[e.target.id];
        updateTimeDisplay(currentDuration);
    }
});

function updateTimeDisplay(secs) {
    let min = Math.floor(secs / 60);
    let sec = secs % 60;
    timeDisplay.textContent = `${min}:${sec}`;
}

// Play/Pause Button
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseMeditation();
    } else {
        startMeditation();
    }
});

function startMeditation() {
    isPlaying = true;
    video.play();
    audio.play();
    playBtn.textContent = 'Pause';
    let t = currentDuration;
    updateTimeDisplay(t);
    timer = setInterval(() => {
        t--;
        updateTimeDisplay(t);
        if (t <= 0) {
            pauseMeditation();
        }
    }, 1000);
}

function pauseMeditation() {
    isPlaying = false;
    video.pause();
    audio.pause();
    playBtn.textContent = 'Play';
    clearInterval(timer);
}

// Sound Picker
document.getElementById('beach-btn').addEventListener('click', () => {
    video.src = 'Videos/beach.mp4';
    audio.src = 'Sounds/beach.mp3';
    resetMeditation();
    setActiveButton('beach-btn');
});

document.getElementById('rain-btn').addEventListener('click', () => {
    video.src = 'Videos/rain.mp4';
    audio.src = 'Sounds/rain.mp3';
    resetMeditation();
    setActiveButton('rain-btn');
});

function resetMeditation() {
    pauseMeditation();
    video.currentTime = 0;
    audio.currentTime = 0;
    updateTimeDisplay(currentDuration);
}

function setActiveButton(which) {
    soundPickerBtns.forEach(btn => btn.classList.remove('active'));
    document.getElementById(which).classList.add('active');
}

// Initial display
updateTimeDisplay(currentDuration);
setActiveButton('beach-btn');
