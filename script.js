const audio = document.getElementById("audio");
const playState = document.querySelector("#play-stop svg:nth-child(1)");
const stopState = document.querySelector("#play-stop svg:nth-child(2)");
const prevSongBtn = document.querySelector(".player-actions .action--change:nth-child(1)");
const nextSongBtn = document.querySelector(".player-actions .action--change:nth-child(3)");
const playBtn = document.getElementById("play-stop");
const manager = songManager();
const progressElement = document.getElementById("progress");
const currentTimeDisplay = document.querySelector(".time-display div:nth-child(1)");
const totalTimeDisplay = document.querySelector(".time-display div:nth-child(2)");
const songImageDisplay = document.querySelector(".song__image");
const songNameDisplay = document.querySelector(".song__name");
const songAuthorDisplay = document.querySelector(".song__author");
const progressBarElement = document.querySelector(".progress-bar");


function updateStateBtn() {
    if (audio.paused) {
        playState.classList.remove("toggle-hidden");
        stopState.classList.add("toggle-hidden");
    } else {
        playState.classList.add("toggle-hidden");
        stopState.classList.remove("toggle-hidden");
    }
}

function toggleStateSong() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updateStateBtn();
}

function songManager() {
    let songs = ["forest-lullaby-110624.mp3", "lost-in-city-lights-145038.mp3"];
    let authors = ["Lesfm", "Cosmo Sheldrake"];
    let names = ["Forest Lullaby", "Lost in the City Lights"];
    let images = ["cover-2.png", "cover-1.png"];
    let currentSongId = 1;
    return {
        nextSong() {
            currentSongId += 1;
            currentSongId = currentSongId % songs.length;
        },
        prevSong() {
            currentSongId -= 1;
            currentSongId = (currentSongId + songs.length) % songs.length;
        },
        get getSong() {
            return songs[currentSongId];
        },
        get getName() {
            return names[currentSongId];
        },
        get getAuthor() {
            return authors[currentSongId];
        },
        get getImage() {
            return images[currentSongId];
        }
    };
}

function updateProgressBar() {
    let progressSong = (audio.currentTime / audio.duration) * 100;
    progressElement.style.width = progressSong + "%";
}

function formatTime(sec) {
    let minute = Math.floor(sec / 60);
    let second = Math.floor(sec % 60);
    return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
}

function resetTimeDisplay() {
    currentTimeDisplay.textContent = "00:00";
    totalTimeDisplay.textContent = formatTime(audio.duration);
}

function updateSongDetails() {
    songImageDisplay.src = "resources/" + manager.getImage;
    songAuthorDisplay.textContent = manager.getAuthor;
    songNameDisplay.textContent = manager.getName;
}

function nextSong() {
    manager.nextSong();
    audio.src = "resources/" + manager.getSong;
    if (audio.paused) {
        toggleStateSong();
    }
    updateSongDetails();
}

function prevSong() {
    manager.prevSong();
    audio.src = "resources/" + manager.getSong;
    if (audio.paused) {
        toggleStateSong();
    }
    updateSongDetails();
}

playBtn.addEventListener("click", () => {
    toggleStateSong();
});

nextSongBtn.addEventListener("click", nextSong);

prevSongBtn.addEventListener("click", prevSong);

audio.addEventListener("loadedmetadata", resetTimeDisplay);

audio.addEventListener("timeupdate", () => {
    updateProgressBar();
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progressBarElement.addEventListener("click", (e) => {
    const clickPosition = e.offsetX;
    const width = progressBarElement.offsetWidth;
    audio.currentTime = (clickPosition / width) * audio.duration;
    if (audio.paused) {
        toggleStateSong();
    }
});