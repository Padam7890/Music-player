const musicSong = document.getElementById("music-player");
const playMusicButton = document.getElementById("play-music");
const playIcon = document.getElementById("play-icon");
const progressBar = document.getElementById("myProgressBar");
const timeStart = document.getElementById("time-start");
const totalTime = document.getElementById("total-time");
const nextSong = document.getElementById("next-song");
const previousSong = document.getElementById("previous-song");
const musicList = document.getElementById("music-list");
const repeatButton = document.getElementById("repeat");

let songList = [
  {
    songName: "Paheli Bhi Main - Animal",
    artist: "Vishal Mishra",
    album: "Paheli bhi Main - Animal",
    singer: "Vishal Mishra",
    images: "./images/paheli-bhi-main.jpg",
    music: "./songs/pahelibhimain.mp3",
    duration: "4:30",
  },

  {
    songName: "ANIMAL: SATRANGA",
    artist: "RANBIR KAPOOR, RASHMIKA MANDANNA",
    album: "ANIMAL: SATRANGA",
    singer: "Arjit Singh",
    images: "./images/satranga.jpg",
    music: "./songs/satranga.mp3",
    duration: "4:51",
  },

  {
    songName: "O Bedardeya | Rap Version",
    artist: "RCR @Rcrrapstar",
    album: "O Bedardeya | Rap Version",
    singer: "RCR @Rcrrapstar ",
    images: "./images/bedardiya.jpg",
    music: "./songs/bedardeya.mp3",
    duration: "4:51",
  },

];

let currentMusicIndex = 0;
let audioElement = new Audio();
let isPlaying = false;
let isRepeatMode = false;

function displayMusic() {
  let songName = songList[currentMusicIndex].songName;
  let artist = songList[currentMusicIndex].artist;
  let album = songList[currentMusicIndex].album;
  let images = songList[currentMusicIndex].images;

  let data = `
        <div class="music-cover">
        <img src="${images}" width="300px" alt="">
   </div>
   <div class="song-title">
   <span>Title - </span>
   <p>${songName}</p>
  
   </div>
  
   <div class="music-album">
        <span>Album - </span>
        <p>${album}</p>
   </div>
  
   <div class="music-artist">
       <span>Artist - </span>
       <p>${artist}</p>
   </div>
        
        `;
  musicSong.innerHTML = data;
  audioElement.src = songList[currentMusicIndex].music;
  audioElement.addEventListener("loadedmetadata", function () {
    totalTime.innerHTML = formatTime(audioElement.duration);
  });
  displayLists();
}

displayMusic();
playingButtons();

function playingButtons() {
playMusicButton.addEventListener("click", () => {
    playpauseTrack();
  });
  nextSong.addEventListener("click", () => {
    gonextSong();
  });
  previousSong.addEventListener("click", () => {
    playPreviousSong();
  });
  repeatButton.addEventListener("click", repeatMode);
}



function playpauseTrack() {
  if (!isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  audioElement.play();
  isPlaying = true;
  playIcon.className = "bx bx-pause";
  updateProgressBar();
}

function pauseMusic() {
  audioElement.pause();
  isPlaying = false;
  playIcon.className = "bx bx-play";
}

function gonextSong() {
    currentMusicIndex = (currentMusicIndex + 1) % songList.length;
    displayMusic();
    playMusic();
}

audioElement.addEventListener("ended", afterSongEnd);


function afterSongEnd() {
    if (isRepeatMode) {
        playMusic();
      } else {
        currentMusicIndex = (currentMusicIndex + 1) % songList.length;
        displayMusic();
        playMusic();
      }
 
}

function playPreviousSong() {
  currentMusicIndex =
    (currentMusicIndex - 1 + songList.length) % songList.length;
  displayMusic();
  playMusic();
}

function repeatMode() {
  isRepeatMode = !isRepeatMode;
  if (isRepeatMode) {
    repeatButton.style.backgroundColor = "#F67C4B";
    repeatButton.style.color = "white";
    repeatButton.style.border = "none";

  } else {
    repeatButton.style.backgroundColor = "white";
    repeatButton.style.color = "black";
    repeatButton.style.border = "1px solid #9a9ea6";

  }
}

function updateProgressBar() {
  audioElement.addEventListener("timeupdate", function () {
    const duration = audioElement.duration;
    const currentTime = audioElement.currentTime;
    const formattedTime = formatTime(currentTime);
    const totalTimes = formatTime(duration);
    const progress = (currentTime / duration) * 100;
    timeStart.innerHTML = formattedTime;
    totalTime.innerHTML = totalTimes;
    progressBar.style.width = progress + "%";
  });
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function displayLists() {
  musicList.innerHTML = "";
  for (let index = 0; index < songList.length; index++) {
    const element = songList[index];
    let isCurrentlyPlaying = index === currentMusicIndex;
    let playingText = isCurrentlyPlaying ? "Playing" : "";
    let data = `
        <div class="songs ${
          index === currentMusicIndex ? "playing" : ""
        }" onclick="playSelectedMusic(${index})">
        
          <div class="song-name">
          ${isCurrentlyPlaying ? '<div class="playingText"></div>' : ''}
            ${element.songName}
          </div>
          <div class="singer-name">
            <span>Singers:</span>
            <p>${element.singer}</p>
          </div>
          <div class="duration">
            <p>${element.duration}</p>
          </div>
        </div>
      `;

    musicList.innerHTML += data;
  }
}
function playSelectedMusic(index) {
  currentMusicIndex = index;
  displayMusic();
  playMusic();
}
