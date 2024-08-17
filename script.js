// script.js
function toggleAnswer(element) {
    var answer = element.nextElementSibling; // The next element after the question
    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}

// script.js
let songs = [
    { title: "christmas carol", img: "images/album1.png", audio: "audios/christmas_carol.m4a" },
    { title: "country guitar", img: "images/album2.png", audio: "audios/country_guitar.m4a" },
    { title: "dubstep", img: "images/album3.png", audio: "audios/dubstep.m4a" },
    { title: "lofi", img: "images/album4.png", audio: "audios/lofi.m4a" },
    { title: "rock blues", img: "images/album5.png", audio: "audios/rock_blues.m4a" },
    { title: "techno", img: "images/album6.png", audio: "audios/techno.m4a" }
];

let currentIndex = 0;
let currentAudio = null;

function updateCatalogue() {
    const items = document.querySelectorAll('.music-item');

    items[0].querySelector('img').src = songs[(currentIndex - 1 + songs.length) % songs.length].img;
    items[0].querySelector('h3').textContent = songs[(currentIndex - 1 + songs.length) % songs.length].title;
    items[0].querySelector('.audio').src = songs[(currentIndex - 1 + songs.length) % songs.length].audio;
    items[0].querySelector('.play-pause-btn img').src = 'images/play_icon.svg';

    items[1].querySelector('img').src = songs[currentIndex].img;
    items[1].querySelector('h3').textContent = songs[currentIndex].title;
    items[1].querySelector('.audio').src = songs[currentIndex].audio;
    items[1].querySelector('.play-pause-btn img').src = 'images/play_icon.svg';

    items[2].querySelector('img').src = songs[(currentIndex + 1) % songs.length].img;
    items[2].querySelector('h3').textContent = songs[(currentIndex + 1) % songs.length].title;
    items[2].querySelector('.audio').src = songs[(currentIndex + 1) % songs.length].audio;
    items[2].querySelector('.play-pause-btn img').src = 'images/play_icon.svg';

    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;

    document.querySelector('.left').classList.replace('left', 'fade-out');
    document.querySelector('.center').classList.replace('center', 'left');
    document.querySelector('.right').classList.replace('right', 'center');

    setTimeout(() => {
        document.querySelector('.fade-out').classList.replace('fade-out', 'right');
        updateCatalogue();
    }, 500);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;

    document.querySelector('.right').classList.replace('right', 'fade-out');
    document.querySelector('.center').classList.replace('center', 'right');
    document.querySelector('.left').classList.replace('left', 'center');

    setTimeout(() => {
        document.querySelector('.fade-out').classList.replace('fade-out', 'left');
        updateCatalogue();
    }, 500);
}
// ----------------------------------------------------------------------------------------------
// WITHOUT PROGRESS BAR:
// ----------------------------------------------------------------------------------------------
// function togglePlayPause(button) {
//     const audioElement = button.closest('.music-item').querySelector('.audio');
//     const imgElement = button.querySelector('img');

//     if (currentAudio && currentAudio !== audioElement) {
//         currentAudio.pause();
//         currentAudio.closest('.music-item').querySelector('.play-pause-btn img').src = 'images/play_icon.svg';
//     }

//     if (audioElement.paused) {
//         audioElement.play();
//         imgElement.src = 'images/pause_icon.svg';
//         currentAudio = audioElement;
//     } else {
//         audioElement.pause();
//         imgElement.src = 'images/play_icon.svg';
//     }
// }

// // Initialize the catalogue and load the first song
// updateCatalogue();
// ----------------------------------------------------------------------------------------------

function togglePlayPause(button) {
    const audioElement = button.closest('.music-item').querySelector('.audio');
    const imgElement = button.querySelector('img');
    const progressBar = button.closest('.music-item').querySelector('.progress-bar');
    const timeDisplay = button.closest('.music-item').querySelector('.time-display');

    if (currentAudio && currentAudio !== audioElement) {
        currentAudio.pause();
        currentAudio.closest('.music-item').querySelector('.play-pause-btn img').src = 'images/play_icon.svg';
    }

    if (audioElement.paused) {
        audioElement.play();
        imgElement.src = 'images/pause_icon.svg';
        currentAudio = audioElement;
        currentAudio.ontimeupdate = function () {
            updateProgressBar(progressBar, timeDisplay);
        };
    } else {
        audioElement.pause();
        imgElement.src = 'images/play_icon.svg';
    }
}

function updateProgressBar(progressBar, timeDisplay) {
    const duration = currentAudio.duration;
    const currentTime = currentAudio.currentTime;
    progressBar.max = duration;
    progressBar.value = currentTime;

    // const remainingTime = duration - currentTime;
    // timeDisplay.textContent = formatTime(currentTime) + ' / ' + formatTime(remainingTime);

    progressBar.oninput = function () {
        currentAudio.currentTime = progressBar.value;
    };
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

window.onload = updateCatalogue;