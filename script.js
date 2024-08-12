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
    { title: "Song Title 1", img: "images/album1.svg", audio: "song1.mp3" },
    { title: "Song Title 2", img: "images/album1.svg", audio: "song2.mp3" },
    { title: "Song Title 3", img: "images/album1.svg", audio: "song3.mp3" },
    { title: "Song Title 4", img: "images/album1.svg", audio: "song4.mp3" },
    { title: "Song Title 5", img: "images/album1.svg", audio: "song5.mp3" }
];

let currentIndex = 0;
let audioElement = new Audio(songs[currentIndex].audio);


function updateCatalogue() {
    const items = document.querySelectorAll('.music-item');

    // Update the content of the music items
    items[0].querySelector('img').src = songs[(currentIndex - 1 + songs.length) % songs.length].img;
    items[0].querySelector('h3').textContent = songs[(currentIndex - 1 + songs.length) % songs.length].title;

    items[1].querySelector('img').src = songs[currentIndex].img;
    items[1].querySelector('h3').textContent = songs[currentIndex].title;

    items[2].querySelector('img').src = songs[(currentIndex + 1) % songs.length].img;
    items[2].querySelector('h3').textContent = songs[(currentIndex + 1) % songs.length].title;

    // Update and play the current audio
    audioElement.src = songs[currentIndex].audio;
    audioElement.play();
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

// Initialize the catalogue and play the first song
updateCatalogue();
