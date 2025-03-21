const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');
    volumeSlider = document.getElementById('volume');

const music = new Audio();

const songs = [
    {
        path: 'files/hypnogaja-home.mp3',
        displayName: 'Home',
        cover: 'files/1.webp',
        artist: 'Hypnogaja'
    },
    {
        path: 'files/Грязь - Жуки в янтаре.mp3',
        displayName: 'Жуки в янтаре',
        cover: 'files/2.jpg',
        artist: 'Грязь'
    },
    {
        path: 'files/Architects - Blackhole.mp3',
        displayName: 'Blackhole',
        cover: 'files/3.jpg',
        artist: 'Architects'
    },
    {
        path: 'files/Bad Omens - Just Pretend.mp3',
        displayName: 'Just Pretend',
        cover: 'files/4.webp',
        artist: 'Bad Omens'
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay () {
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
};

function playMusic () {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

function pauseMusic () {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

function loadMusic (song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
};

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();

};

function updateProgressBar () {
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
};

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
};

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

volumeSlider.addEventListener('input', function() {
    music.volume = this.value / 100;
});

loadMusic(songs[musicIndex]);
