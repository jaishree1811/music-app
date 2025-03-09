let current_mood= document.querySelector(".current-mood");

let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
  {
    index: 0,
    img: "./assets/pala_palakura_image.png",
    name: "pala palakura",
    artist: "Harris Jayaraj",
    music: "./assets/Pala Palakura.mp3",
    mood: "happy"
  },
  {
    index: 1,
    img: "./assets/yelo_pullelo_img.jpg",
    name: "yello pullelo",
    artist: "Anirudh Ravichander",
    music: "./assets/Yelo Pullelo.mp3",
    mood: "happy"
  },
  {
    index: 2,
    img: "./assets/enjoy-enjaami-tamil-2021.webp",
    name: "enjoy enjaami",
    artist: "Amith Krishnan",
    music: "./assets/Enjoy-Enjaami-MassTamilan.io.mp3",
    mood: "happy"
  },
  {
    index: 3,
    img: "./assets/newyork_nagaram_photo.webp",
    name: "newyork nagaram",
    artist: " A.R.Rahman",
    music: "./assets/New York Nagaram.mp3",
    mood: "happy"
  },
  {
    index: 4,
    img: "./assets/kannum-kannum-kollaiyadithaal-2020.webp",
    name: "kanave song",
    artist: "Desingh Periyasamy",
    music: "./assets/Kanave-Nee-Naan-MassTamilan.io.mp3",
    mood: "sad"
  },
  {
    index: 5,
    img: "./assets/yaradi-nee-mohini (1).webp",
    name: "vennmegam",
    artist: " Yuvan Shankar Raja",
    music: "./assets/Venmegam-Pennaga.mp3",
     mood: "sad"
  },
  {
    index: 6,
    img: "./assets/anegan.webp",
    name: "thodu vanam",
    artist: "Hariharan, Shakthishree Gopalan",
    music: "./assets/Thodu-Vaanam.mp3",
     mood: "sad"
  },
  {
    index: 7,
    img: "./assets/raja-rani-2013.webp",
    name: "emaye emaye",
    artist: "G.V.Prakash Kumar",
    music: "./assets/Imaye-Imaye.mp3",
     mood: "sad"
  },
  {
    index: 8,
    img: "./assets/anjathey.webp",
    name: "kathaala kannala",
    artist: " Sundar C Babu",
    music: "./assets/Kathaala-Kannaala.mp3",
     mood: "vibe"
  },
  {
    index: 9,
    img: "./assets/vaanam-2010.webp",
    name: "no money no money",
    artist: " Yuvan Shankar Raja",
    music: "./assets/No-Money-No-Honey.mp3",
     mood: "vibe"
  },
  {
    index: 10,
    img: "./assets/sakkarakatti-2008.webp",
    name: "taxi taxi",
    artist: " A.R.Rahman",
    music: "./assets/Taxi-Taxi.mp3",
     mood: "vibe"
  },
  {
    index: 11,
    img: "./assets/vaaranam-aayiram-2008.webp",
    name: "yethi yethi",
    artist: " Harris Jayaraj",
    music: "./assets/Yethi-Yethi-MassTamilan.com.mp3",
     mood: "vibe"
  },
  {
    index: 12,
    img: "./assets/lover-tamil-2024.webp",
    name: "lover",
    artist: "Sean Roldan",
    music: "./assets/Theansudare.mp3",
     mood: "depression"
  },
  {
    index: 13,
    img: "./assets/outhu pettai.webp",
    name: "oru naalil",
    artist: "Yuvan Shankar Raja",
    music: "./assets/Oru-Naalil---It-All-Comes-Down-To-this!.mp3",
     mood: "depression"
  },
  {
    index: 14,
    img: "./assets/manithan-2016.webp",
    name: "poi vazhva",
    artist: ": Santhosh Narayanan",
    music: "./assets/Poi-Vazhva.mp3",
     mood: "depression"
  },
  {
    index: 15,
    img: "./assets/amaran-tamil-2024.webp",
    name: "vane vane",
    artist: " G. V. Prakash Kumar",
    music: "./assets/Vaane Vaane.mp3",
     mood: "depression"
  },
  {
    index: 16,
    img: "./assets/teddy-2020.webp",
    name: "en enniya thanimaiyea",
    artist: " D.Imman",
    music: "./assets/En-Iniya-Thanimaye-MassTamilan.io.mp3",
     mood: "lonely"
  },
  {
    index: 17,
    img: "./assets/96-2018.webp",
    name: "life of ram",
    artist: "Govind Vasantha",
    music: "./assets/The_Life_Of_Ram-MassTamilan.com.mp3",
     mood: "lonely"
  },
  {
    index: 18,
    img: "./assets/netrikann-tamil-2021.webp",
    name: "idhuvum kadanthu pogum",
    artist: " Girishh Gopalakrishnan",
    music:
      "./assets/Idhuvum-Kadandhu-Pogum-(The-Healing-Song)-MassTamilan.fm.mp3",
       mood: "lonely"
  },
  {
    index: 19,
    img: "./assets/sivappu-manjal-pachai-2019.webp",
    name: "usurea",
    artist: " Siddhu Kumar",
    music: "./assets/Usure-MassTamilan.org.mp3",
     mood: "lonely"
  },
];

loadTrack(track_index);
listMusic("happy")

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index]["music"];
  curr_track.load();

  track_art.style.backgroundImage =
    "url('" + music_list[track_index]["img"] + "')";
  track_name.textContent = music_list[track_index]["name"];
  track_artist.textContent = music_list[track_index]["artist"];

  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}
function searchMood() {
  let inputText = current_mood.value;

  fetch("http://localhost:5000/detect", {
    method: "POST",  // Change method to POST
    headers: {
      "Content-Type": "application/json",  // tells the server that were are sending the data.
    },
    body: JSON.stringify({ text: inputText }), // Convert the input text into JSON format
  })
    .then(response => {  //If the server returns an error 
      if (!response.ok) {  //, it throws an error. or it converts the response to JSON format.
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.mood) {   //store the detect mood
        throw new Error("Mood data missing in response");
      }

      let detectedMood = data.mood; //store the detect mood
      let filteredMusicList = music_list.filter(song => song.mood === detectedMood); //search the song what does the mood i'm
      if (filteredMusicList.length > 0) {
        let song = filteredMusicList[0];  // Get the first matching song
        track_index = song.index;   // Get the song index
        loadTrack(track_index);
        listMusic(detectedMood);
      } else {
        console.warn("No matching songs found for mood:", detectedMood);
      }
    })
    .catch(error => {
      console.error("Error detecting mood:", error);
    });
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";                                           
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random) * music_list.length;
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index--;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.curr_time * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );

    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function listMusic(mood) {
  let songs = music_list.filter(song => song.mood === mood); 
  const songList = document.getElementById("song-list");
  songList.innerHTML = "";

  songs.forEach((song) => {
    const li = document.createElement("li");
    li.classList.add("song-name");
    li.classList.add("row");
    li.innerHTML = `<li class="song-item" onclick="loadTrack(${song.index})">
                      <span class="song-info">
                        <img src="${song.img}" class="img-list"/>
                        ${song.name}
                      </span>
                      <i class="fa fa-play-circle fa-2x"></i>
                    </li>`;
    songList.appendChild(li);
  });
}