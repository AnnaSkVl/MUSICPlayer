const image = document.querySelector('img');
const title = document.getElementById('title');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: '1',
        displayName: 'The silent night',

    },
    {
        name: '2',
        displayName: 'And from last night',

    },
    {
        name: '3',
        displayName: 'At Christmas',

    },
    {
        name: '4',
        displayName: 'Christmas',

    },
    
];

// check if Playing
let isPlaying = false;

//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar&Time
function updateProgressBar(e){
    if (isPlaying){
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        // Update progress bar width
        const ProgressPercent = (currentTime / duration)
         * 100;
        progress.style.width = `${ProgressPercent}%`;
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);
       
        //Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);