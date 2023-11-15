const songs = [
    {
        title: "At My Worst",
        artist: "Pink Sweats",
        file: "media/I Need Somebody Who Can Love Me At My Worst(audiosong.in).mp3",
        image: "media/thumpnail.jpg",
    },
    {
        title: "Let Me Down Slowly",
        artist: "Alec Benjamin",
        file: "media/Let Me Down Slowly Alec Benjamin 128 Kbps.mp3",
        image: "media/letmedown.jpg",
    },
    {
        title: "Memories-Bonafide",
        artist: "Bilal Saeed",
        file: "media/Memories - Bonafide Ft Bilal Saeed 320kbps.mp3",
        image: "media/memories.jpeg",
    },
];

let currentSongIndex = 0;

function updateSongInfo() {
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songImage = document.querySelector(".song-img");
    songTitle.textContent = songs[currentSongIndex].title;
    songArtist.textContent = songs[currentSongIndex].artist;
    songImage.src = songs[currentSongIndex].image;
}

function playSong(index) {
    const song = document.getElementById("song");
    const ctrlIcon = document.getElementById("ctrlIcon");
    song.src = songs[index].file;
    song.load();
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
    currentSongIndex = index;
    updateSongInfo();
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function playPrevious() {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

function addSong(title, artist, file, image) {
    songs.push({ title, artist, file, image });
    updatePlaylist();
}

function togglePlaylist() {
    console.log("Hello");
    var playlistContainer = document.getElementById("playlistContainer");
    var musicPlayer = document.querySelector(".music-player");
    if (playlistContainer.style.display === "none" || playlistContainer.style.display === "") {
        playlistContainer.style.display = "block";
        musicPlayer.style.display = "none";
    } else {
        playlistContainer.style.display = "none";
        musicPlayer.style.display = "block";
    }
}

function updatePlaylist() {
    const playlist = document.getElementById("playlist");
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist}`;
        listItem.addEventListener("click", () => playSong(index));
        playlist.appendChild(listItem);
    });
}

updatePlaylist();
updateSongInfo();

function goToMusicPlayer() {
    var musicPlayer = document.querySelector(".music-player");
    var playlistContainer = document.getElementById("playlistContainer");
    musicPlayer.style.display = "block";
    playlistContainer.style.display = "none";
}

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

progress.addEventListener("input", function () {
    song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
    song.play();
});

song.addEventListener("timeupdate", function () {
    progress.value = song.currentTime;
});