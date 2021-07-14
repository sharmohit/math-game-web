


let testList = [] 


const HIGH_SCORE_KEY = "math-game-highscore"

console.log("Highscore JS page is ready")


let reset_data = document.getElementById("reset_data")

reset_data.onclick = function(){

    console.log("Items deleted")
    localStorage.removeItem("HIGH_SCORE_KEY")
    localStorage.clear();
    var table = document.getElementById("myTable")
    while(table.rows.length > 0) {
        table.deleteRow(0);
      }
}

const getHighScore = () => {

    console.log("High score button clicked")
    if (HIGH_SCORE_KEY in localStorage) {

        document.getElementById("test2").innerText = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));

    } else {
        return null
    }
}

testList= JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));
let myArray = testList

buildTable(testList)

function buildTable(data){

    let table = document.getElementById("myTable")

    for ( let i = 0; i < data.length; i ++ ){
        let row = `<tr>
                    <td>${data[i].playerName}</td>
                    <td>${data[i].level}</td>
                    </tr>`

         table.innerHTML += row
    }
}


