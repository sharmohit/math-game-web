

let testList = []

const HIGH_SCORE_KEY = "math-game-highscore"

let reset_data = document.getElementById("reset_data")

reset_data.onclick = () => {

    console.log("Items deleted")
    localStorage.removeItem("HIGH_SCORE_KEY")
    localStorage.clear();
    let table = document.getElementById("myTable")
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

getHighScore = () => {

    console.log("High score button clicked")
    if (HIGH_SCORE_KEY in localStorage) {

        document.getElementById("test2").innerText = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));

    } else {
        return null
    }
}

buildTable = (data) => {

    let table = document.getElementById("myTable")

    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
                    <td>${data[i].playerName}</td>
                    <td>${data[i].level}</td>
                    </tr>`

        table.innerHTML += row
    }
}

testList = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY));
buildTable(testList);