const AUDIO_KEY = "math-game-audio"

passvalues = () => {
  var firstname = document.getElementById("txt").value;
  localStorage.setItem("textvalue",firstname);
  return false;
}


 togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active");
  }


 playMe = () => {

  var audio = document.getElementById('testAudio');

    if(this.className == 'is-playing'){
      this.className = "";
      document.getElementById("playAudio").innerHTML = "Play &#9658;";
      document.getElementById("home_audio").src = "assets/img/no-sound.png";
      audio.pause();
      localStorage.setItem(AUDIO_KEY, "false")
    }else{
      this.className = "is-playing";
      document.getElementById("playAudio").innerHTML = "Pause &#9208;";
      document.getElementById("home_audio").src = "assets/img/volume.png";
      audio.play();
      localStorage.setItem(AUDIO_KEY, "true");
    }
}

