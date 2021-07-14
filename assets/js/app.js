const AUDIO_KEY = "math-game-audio"

const passvalues = () => {
  if (document.getElementById("txt").value.length == 0) {
    document.getElementById("name_error").innerText = "* Name Required"
  }
  else {
    var firstname = document.getElementById("txt").value
    localStorage.setItem("textvalue",firstname)
    let url = "game.html"
    window.location = url
  }
  return false
}


const togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active")
  }


const playMe = () => {

  let audio = document.getElementById('testAudio')

    if(this.className == 'is-playing'){
      this.className = ""
      document.getElementById("playAudio").innerHTML = "Play &#9658;"
      document.getElementById("home_audio").src = "assets/img/sound-off.png"
      audio.pause()
      localStorage.setItem(AUDIO_KEY, "false")
    }else{
      this.className = "is-playing"
      document.getElementById("playAudio").innerHTML = "Pause &#9208;"
      document.getElementById("home_audio").src = "assets/img/sound-on.png"
      audio.play()
      localStorage.setItem(AUDIO_KEY, "true")
    }
}

