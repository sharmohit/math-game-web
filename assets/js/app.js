const AUDIO_KEY = "math-game-audio"

function passvalues () {
  var firstname = document.getElementById("txt").value;
  localStorage.setItem("textvalue",firstname);
  return false;
}


function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }


function playMe () {

  var audio = document.getElementById('testAudio');

    if(this.className == 'is-playing'){
      this.className = "";
      document.getElementById("playAudio").innerHTML = "Play &#9658;"
      audio.pause();
      localStorage.setItem(AUDIO_KEY, "false")
    }else{
      this.className = "is-playing";
      document.getElementById("playAudio").innerHTML = "Pause &#9208;";
      audio.play();
      localStorage.setItem(AUDIO_KEY, "true")
    }
}


