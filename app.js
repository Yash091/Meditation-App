const app = function () {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");
  const sounds = document.querySelectorAll(".selector button");
  const outlineLength = outline.getTotalLength();
  const timer = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-selector button");
  let fakeDuration = 600;

  const checkSong = function (song) {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  play.addEventListener("click", function () {
    checkSong(song);
  });

  song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
    timer.textContent = `${minutes}:${seconds}`;
    console.log(timer.value);
  };

  outline.style.strokeDasharray = outlineLength;
  timer.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
  )}`;

  sounds.forEach((s) => {
    s.addEventListener("click", function () {
      song.src = s.dataset.sound;
      video.src = s.dataset.video;
      checkSong(song);
    });
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.dataset.time;
      timer.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
};
app();
