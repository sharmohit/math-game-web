


let testList = [] 


const HIGH_SCORE_KEY = "math-game-highscore"

console.log("Highscore JS page is ready")


var reset_data = document.getElementById("reset_data")

reset_data.onclick = function(){
    // var keys = Object.keys(localStorage)
    // console.log(keys)
    console.log("Items deleted")
    localStorage.removeItem("HIGH_SCORE_KEY")
    localStorage.clear();
    var table = document.getElementById("myTable")
    while(table.rows.length > 0) {
        table.deleteRow(0);
      }
}

// var highscoredata = document.getElementById("highScore_data")

// highscoredata.onclick = function () {
//     getHighScore();
// }

const getHighScore = () => {

    console.log("High score button clicked")
    if (HIGH_SCORE_KEY in localStorage) {

        document.getElementById("test").innerText = "Hello Hi there ";

        // console.log("Score: Player Name: " + player.name + " Level: " + currentLevel)


        // console.log(JSON.parse(localStorage.getItem(HIGH_SCORE_KEY)))

        console.log( testList)

        console.log( testList[0].playerName)
        console.log( testList[3].playerName)
       
        console.log( testList[3].level)

        document.getElementById("test2").innerText = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));

    } else {
        return null
    }
}

testList= JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));
var myArray = testList

buildTable(testList)

function buildTable(data){

    
    var table = document.getElementById("myTable")

    for ( var i = 0; i < data.length; i ++ ){
        var row = `<tr>
                    <td>${data[i].playerName}</td>
                    <td>${data[i].level}</td>
                    </tr>`

                    table.innerHTML += row
    }
}


